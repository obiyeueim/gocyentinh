(function () {
  "use strict";

  var demoRequests = [
    {
      id: "DEMO-001", display_name: "Minh Anh (mẫu)", contact_method: "other", contact_value: "Zalo 0900 000 001 · minh họa",
      subject: "Áp lực học tập trước kỳ thi", urgency: "urgent", status: "new", immediate_risk: 0,
      description: "Em đang mất ngủ và khó tập trung vì lịch kiểm tra dày. Em muốn được thầy cô tư vấn cách sắp xếp việc học và nghỉ ngơi.",
      account_email: "minhanh.demo@example.com", assigned_name: null, private_notes: "", created_at: "2026-08-01T07:20:00",
      stress_depression: 12, stress_anxiety: 16, stress_stress: 24,
    },
    {
      id: "DEMO-002", display_name: "Hoàng Nam (mẫu)", contact_method: "other", contact_value: "Email demo-02@example.com",
      subject: "Cần một người lắng nghe", urgency: "soon", status: "contacting", immediate_risk: 0,
      description: "Gần đây em thấy khó hòa nhập với lớp mới và thường tránh các hoạt động tập thể. Em muốn có một buổi trò chuyện riêng.",
      account_email: null, assigned_name: "Cô Lan", private_notes: "Đã hẹn trao đổi vào giờ sinh hoạt chiều thứ Sáu.", created_at: "2026-07-31T09:45:00",
      stress_depression: null, stress_anxiety: null, stress_stress: null,
    },
    {
      id: "DEMO-003", display_name: "Thảo Vy (mẫu)", contact_method: "other", contact_value: "Phòng tham vấn · hồ sơ mẫu 03",
      subject: "Mâu thuẫn với bạn cùng lớp", urgency: "routine", status: "in_progress", immediate_risk: 0,
      description: "Em và bạn thân hiểu lầm nhau trong một thời gian dài. Em cần hướng dẫn để bắt đầu nói chuyện lại mà không làm tình hình căng thẳng hơn.",
      account_email: "thaovy.demo@example.com", assigned_name: "Thầy Minh", private_notes: "Đang hỗ trợ kỹ năng giao tiếp và đặt ranh giới.", created_at: "2026-07-29T13:10:00",
      stress_depression: 8, stress_anxiety: 10, stress_stress: 14,
    },
    {
      id: "DEMO-004", display_name: "Gia Hân (mẫu)", contact_method: "other", contact_value: "Hồ sơ minh họa · không liên hệ thật",
      subject: "Theo dõi sau buổi tư vấn", urgency: "routine", status: "resolved", immediate_risk: 0,
      description: "Em đã ổn định hơn sau khi được hướng dẫn bài tập thở và chia nhỏ kế hoạch học tập.",
      account_email: null, assigned_name: "Cô Lan", private_notes: "Đã hoàn tất, hẹn kiểm tra lại sau hai tuần.", created_at: "2026-07-25T08:30:00",
      stress_depression: 6, stress_anxiety: 8, stress_stress: 10,
    },
  ];
  var requests = demoRequests.slice();
  var selectedId = null;
  var statusLabels = { new: "Mới nhận", contacting: "Đang liên hệ", in_progress: "Đang hỗ trợ", resolved: "Đã hoàn tất" };
  var urgencyLabels = { routine: "Vài ngày tới", soon: "Sớm nhất", urgent: "Trong hôm nay" };

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
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var button = form.querySelector("button");
      button.disabled = true;
      item.status = form.querySelector("select").value;
      item.private_notes = form.querySelector("textarea").value;
      showStatus("Đã cập nhật trong bản demo. Dữ liệu thật không bị thay đổi.", "ok");
      loadRequests(false);
      button.disabled = false;
    });
  }

  function loadRequests(clearSelection) {
    if (clearSelection) selectedId = null;
    var status = document.getElementById("adminStatus").value;
    var query = document.getElementById("adminSearch").value.trim().toLocaleLowerCase("vi");
    requests = demoRequests.filter(function (item) {
      var matchesStatus = status === "all" || item.status === status;
      var haystack = [item.display_name, item.contact_value, item.subject, item.description].join(" ").toLocaleLowerCase("vi");
      return matchesStatus && (!query || haystack.includes(query));
    });
    document.getElementById("statTotal").textContent = demoRequests.length;
    document.getElementById("statNew").textContent = demoRequests.filter(function (item) { return item.status === "new"; }).length;
    document.getElementById("statUrgent").textContent = demoRequests.filter(function (item) { return item.urgency === "urgent" && item.status !== "resolved"; }).length;
    document.getElementById("statResolved").textContent = demoRequests.filter(function (item) { return item.status === "resolved"; }).length;
    renderList();
    if (selectedId) {
      var selected = requests.find(function (item) { return item.id === selectedId; });
      if (selected) renderDetail(selected);
    }
  }

  function initialize() {
    document.getElementById("adminIdentity").textContent = "Chế độ trình diễn · toàn bộ hồ sơ và thông tin liên hệ bên dưới là dữ liệu mẫu";
    loadRequests(true);
    if (requests.length) {
      selectedId = requests[0].id;
      renderList();
      renderDetail(requests[0]);
    }
    showStatus("Bạn đang xem dashboard demo công khai. Trang này không tải dữ liệu hỗ trợ thật.", "ok");
  }

  document.getElementById("adminRefresh").addEventListener("click", function () { loadRequests(false); });
  document.getElementById("adminFilter").addEventListener("click", function () { loadRequests(true); });
  document.getElementById("adminSearch").addEventListener("keydown", function (event) {
    if (event.key === "Enter") loadRequests(true);
  });
  initialize();
})();
