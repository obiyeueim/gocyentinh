(function () {
  "use strict";

  var requests = [];
  var selectedId = null;
  var statusLabels = { new: "Mới nhận", contacting: "Đang liên hệ", in_progress: "Đang hỗ trợ", resolved: "Đã hoàn tất" };
  var urgencyLabels = { routine: "Vài ngày tới", soon: "Sớm nhất", urgent: "Trong hôm nay" };

  async function requestJson(url, options) {
    var response = await fetch(url, Object.assign({ headers: { "Content-Type": "application/json" } }, options));
    var payload = await response.json().catch(function () { return {}; });
    if (!response.ok) {
      var error = new Error(payload.message || "Không thể tải dữ liệu.");
      error.status = response.status;
      throw error;
    }
    return payload;
  }

  function showStatus(message, type) {
    var element = document.getElementById("adminStatusMessage");
    element.textContent = message;
    element.className = "portal-status show " + type;
  }

  function appendText(parent, tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    parent.appendChild(element);
    return element;
  }

  function renderList() {
    var list = document.getElementById("adminRequestList");
    list.textContent = "";
    if (!requests.length) {
      appendText(list, "div", "admin-empty", "Không có yêu cầu phù hợp bộ lọc.");
      return;
    }

    requests.forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "admin-request" + (item.id === selectedId ? " active" : "");
      var head = document.createElement("div");
      head.className = "admin-request-head";
      appendText(head, "strong", "", item.display_name);
      appendText(head, "span", "admin-badge" + (item.immediate_risk ? " urgent" : ""), item.immediate_risk ? "Khẩn cấp" : statusLabels[item.status]);
      button.appendChild(head);
      appendText(button, "p", "", item.subject + " · " + item.contact_value);
      button.addEventListener("click", function () {
        selectedId = item.id;
        renderList();
        renderDetail(item);
      });
      list.appendChild(button);
    });
  }

  function dataBlock(parent, label, value, link) {
    var block = document.createElement("div");
    block.className = "admin-data";
    appendText(block, "span", "", label);
    if (link) {
      var anchor = appendText(block, "a", "", value);
      anchor.href = link;
    } else {
      appendText(block, "strong", "", value || "Chưa có");
    }
    parent.appendChild(block);
  }

  function renderDetail(item) {
    var detail = document.getElementById("adminRequestDetail");
    detail.textContent = "";
    appendText(detail, "h2", "", item.subject);
    appendText(detail, "p", "auth-help", "Mã yêu cầu: " + item.id + " · " + new Date(item.created_at + "Z").toLocaleString("vi-VN"));

    var grid = document.createElement("div");
    grid.className = "admin-detail-grid";
    dataBlock(grid, "Người cần hỗ trợ", item.display_name);
    var contactLink = item.contact_method === "phone" || item.contact_method === "zalo" ? "tel:" + item.contact_value.replace(/\s+/gu, "") : item.contact_method === "email" ? "mailto:" + item.contact_value : null;
    dataBlock(grid, "Liên hệ trực tiếp", item.contact_value, contactLink);
    dataBlock(grid, "Mức ưu tiên", urgencyLabels[item.urgency]);
    dataBlock(grid, "Trạng thái", statusLabels[item.status]);
    dataBlock(grid, "Tài khoản", item.account_email || "Gửi ẩn danh");
    dataBlock(grid, "Người phụ trách", item.assigned_name || "Chưa nhận");
    detail.appendChild(grid);

    if (item.immediate_risk) {
      appendText(detail, "div", "portal-status show error", "Đánh dấu không an toàn hoặc có ý nghĩ tự làm hại. Cần ưu tiên quy trình khẩn cấp và liên hệ trực tiếp.");
    }
    appendText(detail, "div", "admin-message", item.description);

    if (item.stress_depression !== null || item.stress_anxiety !== null || item.stress_stress !== null) {
      appendText(
        detail,
        "div",
        "admin-message",
        "DASS-21 tự báo cáo: Trầm cảm " + (item.stress_depression ?? "-") + "/42 · Lo âu " + (item.stress_anxiety ?? "-") + "/42 · Căng thẳng " + (item.stress_stress ?? "-") + "/42. Đây không phải chẩn đoán y khoa.",
      );
    }

    var form = document.createElement("form");
    form.className = "admin-update";
    form.innerHTML =
      '<div class="portal-field"><label for="detailStatus">Cập nhật trạng thái</label><select id="detailStatus"><option value="new">Mới nhận</option><option value="contacting">Đang liên hệ</option><option value="in_progress">Đang hỗ trợ</option><option value="resolved">Đã hoàn tất</option></select></div>' +
      '<div class="portal-field"><label for="detailNotes">Ghi chú nội bộ</label><textarea id="detailNotes" class="support-notes" maxlength="4000" placeholder="Lần liên hệ, người phụ trách, bước tiếp theo..."></textarea></div>' +
      '<button class="portal-button" type="submit">Lưu cập nhật</button>';
    detail.appendChild(form);
    form.querySelector("select").value = item.status;
    form.querySelector("textarea").value = item.private_notes || "";
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      var button = form.querySelector("button");
      button.disabled = true;
      try {
        await requestJson("/api/admin/requests/" + encodeURIComponent(item.id), {
          method: "PATCH",
          body: JSON.stringify({ status: form.querySelector("select").value, privateNotes: form.querySelector("textarea").value }),
        });
        showStatus("Đã lưu trạng thái và ghi chú.", "ok");
        await loadRequests(false);
      } catch (error) {
        showStatus(error.message, "error");
      } finally {
        button.disabled = false;
      }
    });
  }

  async function loadRequests(clearSelection) {
    if (clearSelection) selectedId = null;
    var params = new URLSearchParams();
    var status = document.getElementById("adminStatus").value;
    var query = document.getElementById("adminSearch").value.trim();
    if (status !== "all") params.set("status", status);
    if (query) params.set("q", query);

    var payload = await requestJson("/api/admin/requests?" + params.toString(), { method: "GET", headers: {} });
    requests = payload.requests || [];
    document.getElementById("statTotal").textContent = payload.totals.total || 0;
    document.getElementById("statNew").textContent = payload.totals.new_count || 0;
    document.getElementById("statUrgent").textContent = payload.totals.urgent_count || 0;
    document.getElementById("statResolved").textContent = payload.totals.resolved_count || 0;
    renderList();
    if (selectedId) {
      var selected = requests.find(function (item) { return item.id === selectedId; });
      if (selected) renderDetail(selected);
    }
  }

  async function initialize() {
    try {
      var session = await requestJson("/api/auth/me", { method: "GET", headers: {} });
      if (!session.user || session.user.role !== "admin") {
        window.location.replace("/dang-nhap.html?next=%2Fquan-ly.html");
        return;
      }
      document.getElementById("adminIdentity").textContent = session.user.name + " · " + session.user.email;
      await loadRequests(true);
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        window.location.replace("/dang-nhap.html?next=%2Fquan-ly.html");
      } else {
        showStatus(error.message, "error");
      }
    }
  }

  document.getElementById("adminRefresh").addEventListener("click", function () { loadRequests(false); });
  document.getElementById("adminFilter").addEventListener("click", function () { loadRequests(true); });
  document.getElementById("adminSearch").addEventListener("keydown", function (event) {
    if (event.key === "Enter") loadRequests(true);
  });
  document.getElementById("adminLogout").addEventListener("click", async function () {
    await requestJson("/api/auth/logout", { method: "POST", body: "{}" });
    window.location.replace("/dang-nhap.html");
  });

  initialize();
})();
