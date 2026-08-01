(function () {
  "use strict";

  var currentUser = null;
  var stressResult = window.GBY_STRESS_RESULT || null;
  var lastFocused = null;

  var launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "support-launcher";
  launcher.textContent = "Trung tâm hỗ trợ";
  launcher.setAttribute("aria-controls", "supportShell");
  launcher.setAttribute("aria-expanded", "false");

  var shell = document.createElement("div");
  shell.id = "supportShell";
  shell.className = "support-shell";
  shell.hidden = true;
  shell.innerHTML =
    '<button class="support-backdrop" type="button" data-support-close aria-label="Đóng trung tâm hỗ trợ"></button>' +
    '<section class="support-drawer" role="dialog" aria-modal="true" aria-labelledby="supportTitle">' +
      '<header class="support-head">' +
        '<div><strong id="supportTitle">Góc hỗ trợ riêng tư</strong><span>Chia sẻ an toàn · Ưu tiên đúng người · Không phán xét</span></div>' +
        '<button class="support-close" type="button" data-support-close aria-label="Đóng">×</button>' +
      '</header>' +
      '<div class="support-tabs" role="tablist" aria-label="Các công cụ hỗ trợ">' +
        '<button class="support-tab" id="supportTabQuiz" type="button" role="tab" data-tab="quiz" aria-controls="supportPanelQuiz" aria-selected="true">Đo căng thẳng</button>' +
        '<button class="support-tab" id="supportTabShare" type="button" role="tab" data-tab="share" aria-controls="supportPanelShare" aria-selected="false">Chia sẻ nhu cầu</button>' +
        '<button class="support-tab" id="supportTabAccount" type="button" role="tab" data-tab="account" aria-controls="supportPanelAccount" aria-selected="false">Tài khoản</button>' +
      '</div>' +
      '<div class="support-scroll">' +
        '<div class="support-panel" id="supportPanelQuiz" role="tabpanel" aria-labelledby="supportTabQuiz"><div id="supportQuizMount"></div></div>' +
        '<div class="support-panel" id="supportPanelShare" role="tabpanel" aria-labelledby="supportTabShare" hidden>' +
          '<h2>Bạn đang cần điều gì?</h2>' +
          '<p class="support-intro">Lời nhắn này chỉ hiển thị trong trang quản lý của nhóm hỗ trợ. Hãy để lại cách liên hệ phù hợp để một người phụ trách có thể tiếp cận bạn.</p>' +
          '<form class="support-form" id="supportRequestForm">' +
            '<div class="support-field"><label for="supportName">Tên bạn muốn được gọi</label><input id="supportName" name="displayName" required minlength="2" maxlength="80" autocomplete="name"></div>' +
            '<div class="support-field"><label for="supportMethod">Cách liên hệ</label><select id="supportMethod" name="contactMethod"><option value="phone">Điện thoại</option><option value="zalo">Zalo</option><option value="email">Email</option><option value="other">Cách khác</option></select></div>' +
            '<div class="support-field-wide"><label for="supportContact">Số điện thoại, email hoặc thông tin liên hệ</label><input id="supportContact" name="contactValue" required minlength="5" maxlength="160" autocomplete="email"></div>' +
            '<div class="support-field-wide"><label for="supportSubject">Điều bạn cần hỗ trợ</label><input id="supportSubject" name="subject" required minlength="3" maxlength="120" placeholder="Ví dụ: Áp lực học tập và mất ngủ"></div>' +
            '<div class="support-field-wide"><label for="supportUrgency">Bạn muốn được liên hệ khi nào?</label><select id="supportUrgency" name="urgency"><option value="routine">Trong vài ngày tới</option><option value="soon" selected>Sớm nhất có thể</option><option value="urgent">Trong hôm nay</option></select></div>' +
            '<div class="support-field-wide"><label for="supportDescription">Lời nhắn riêng tư</label><textarea id="supportDescription" name="description" required minlength="10" maxlength="3000" placeholder="Mô tả điều đang xảy ra, điều khiến bạn khó chịu và kiểu hỗ trợ bạn mong muốn..."></textarea></div>' +
            '<div class="support-score-note" id="supportScoreNote"></div>' +
            '<label class="support-check support-risk"><input id="supportImmediateRisk" name="immediateRisk" type="checkbox"><span>Tôi đang cảm thấy không an toàn hoặc có ý nghĩ làm hại bản thân.</span></label>' +
            '<div class="support-emergency-note" id="supportEmergencyNote" hidden><strong>Đừng chờ phản hồi trên website.</strong> Hãy gọi 111/115 hoặc tìm ngay một người lớn đáng tin đang ở gần bạn.</div>' +
            '<label class="support-check"><input name="consent" type="checkbox" required><span>Tôi đồng ý để nhóm hỗ trợ sử dụng thông tin trên nhằm liên hệ và hỗ trợ tôi. Nội dung không được đăng công khai.</span></label>' +
            '<div class="support-status" id="supportFormStatus" role="status"></div>' +
            '<button class="support-submit" type="submit">Gửi lời nhắn riêng tư</button>' +
          '</form>' +
        '</div>' +
        '<div class="support-panel" id="supportPanelAccount" role="tabpanel" aria-labelledby="supportTabAccount" hidden>' +
          '<h2>Tài khoản của bạn</h2>' +
          '<p class="support-intro">Đăng nhập để theo dõi trạng thái những lời nhắn bạn đã gửi.</p>' +
          '<div id="supportAccount"></div>' +
        '</div>' +
      '</div>' +
    '</section>';

  document.body.appendChild(launcher);
  document.body.appendChild(shell);

  var quizSection = document.getElementById("trac-nghiem");
  var quizMount = document.getElementById("supportQuizMount");
  if (quizSection && quizMount) {
    quizSection.classList.add("support-embedded-quiz");
    quizMount.appendChild(quizSection);
    quizSection.querySelectorAll(".reveal, .reveal-hero").forEach(function (element) {
      element.style.opacity = "1";
      element.style.visibility = "visible";
      element.style.transform = "none";
      element.style.filter = "none";
    });
  }

  var tabs = Array.prototype.slice.call(shell.querySelectorAll("[data-tab]"));
  var panels = {
    quiz: document.getElementById("supportPanelQuiz"),
    share: document.getElementById("supportPanelShare"),
    account: document.getElementById("supportPanelAccount"),
  };

  function selectTab(name, focusTab) {
    if (!panels[name]) name = "quiz";
    tabs.forEach(function (tab) {
      var selected = tab.getAttribute("data-tab") === name;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focusTab) tab.focus();
    });
    Object.keys(panels).forEach(function (key) {
      panels[key].hidden = key !== name;
    });
    shell.querySelector(".support-scroll").scrollTop = 0;
    if (name === "account") loadAccount();
  }

  function openSupport(tab) {
    lastFocused = document.activeElement;
    shell.hidden = false;
    document.body.classList.add("support-open");
    launcher.setAttribute("aria-expanded", "true");
    selectTab(tab || "quiz", false);
    window.requestAnimationFrame(function () {
      shell.querySelector('.support-tab[aria-selected="true"]').focus();
    });
  }

  function closeSupport() {
    shell.hidden = true;
    document.body.classList.remove("support-open");
    launcher.setAttribute("aria-expanded", "false");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  launcher.addEventListener("click", function () {
    openSupport("share");
  });
  shell.querySelectorAll("[data-support-close]").forEach(function (button) {
    button.addEventListener("click", closeSupport);
  });
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      selectTab(tab.getAttribute("data-tab"), false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (!shell.hidden && event.key === "Escape") closeSupport();
  });

  document.querySelectorAll('[href="#trac-nghiem"], [data-support-tab]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openSupport(link.getAttribute("data-support-tab") || "quiz");
    });
  });

  function showFormStatus(message, type) {
    var status = document.getElementById("supportFormStatus");
    status.textContent = message;
    status.className = "support-status show " + type;
  }

  function updateStressNote() {
    var note = document.getElementById("supportScoreNote");
    if (!stressResult) {
      note.classList.remove("show");
      note.textContent = "";
      return;
    }
    note.textContent =
      "Kết quả DASS-21 sẽ được đính kèm khi gửi: Trầm cảm " + stressResult.depression +
      "/42 · Lo âu " + stressResult.anxiety + "/42 · Căng thẳng " + stressResult.stress + "/42.";
    note.classList.add("show");
  }

  document.addEventListener("gby:stress-result", function (event) {
    stressResult = event.detail;
    updateStressNote();
  });

  var riskInput = document.getElementById("supportImmediateRisk");
  riskInput.addEventListener("change", function () {
    document.getElementById("supportEmergencyNote").hidden = !riskInput.checked;
    if (riskInput.checked) document.getElementById("supportUrgency").value = "urgent";
  });

  async function requestJson(url, options) {
    var response = await fetch(url, Object.assign({ headers: { "Content-Type": "application/json" } }, options));
    var payload = await response.json().catch(function () { return {}; });
    if (!response.ok) throw new Error(payload.message || "Không thể xử lý yêu cầu lúc này.");
    return payload;
  }

  async function loadSession() {
    try {
      var payload = await requestJson("/api/auth/me", { method: "GET", headers: {} });
      currentUser = payload.user;
      if (currentUser) {
        document.getElementById("supportName").value = currentUser.name;
        document.getElementById("supportContact").value = currentUser.email;
        document.getElementById("supportMethod").value = "email";
      }
    } catch {
      currentUser = null;
    }
  }

  async function loadAccount() {
    var account = document.getElementById("supportAccount");
    account.textContent = "Đang tải...";
    await loadSession();

    if (!currentUser) {
      account.innerHTML =
        '<div class="support-account-card"><strong>Bạn chưa đăng nhập</strong><p class="support-intro">Bạn vẫn có thể gửi lời nhắn riêng tư. Đăng nhập giúp bạn theo dõi trạng thái xử lý.</p>' +
        '<div class="support-account-actions"><a class="support-action" href="/dang-nhap?next=%2Fgoc-binh-yen%3Fsupport%3Daccount">Đăng nhập</a><a class="support-action secondary" href="/dang-nhap?mode=register&next=%2Fgoc-binh-yen%3Fsupport%3Daccount">Tạo tài khoản</a></div></div>';
      return;
    }

    account.innerHTML =
      '<div class="support-account-card"><strong id="supportAccountName"></strong><p class="support-intro" id="supportAccountEmail"></p><div class="support-account-actions">' +
      (currentUser.role === "admin" ? '<a class="support-action" href="/quan-ly">Mở trang quản lý</a>' : "") +
      '<button class="support-action secondary" id="supportLogout" type="button">Đăng xuất</button></div></div><div class="support-requests" id="supportRequests"></div>';
    document.getElementById("supportAccountName").textContent = currentUser.name;
    document.getElementById("supportAccountEmail").textContent = currentUser.email;
    document.getElementById("supportLogout").addEventListener("click", async function () {
      await requestJson("/api/auth/logout", { method: "POST", body: "{}" });
      currentUser = null;
      loadAccount();
    });

    try {
      var payload = await requestJson("/api/support", { method: "GET", headers: {} });
      renderRequests(payload.requests || []);
    } catch (error) {
      document.getElementById("supportRequests").textContent = error.message;
    }
  }

  function renderRequests(requests) {
    var container = document.getElementById("supportRequests");
    container.textContent = "";
    if (!requests.length) {
      container.textContent = "Bạn chưa gửi lời nhắn hỗ trợ nào.";
      return;
    }
    var statusLabels = { new: "Mới nhận", contacting: "Đang liên hệ", in_progress: "Đang hỗ trợ", resolved: "Đã hoàn tất" };
    requests.forEach(function (item) {
      var article = document.createElement("article");
      article.className = "support-request-item";
      var title = document.createElement("h3");
      title.textContent = item.subject;
      var meta = document.createElement("div");
      meta.className = "support-request-meta";
      meta.textContent = (statusLabels[item.status] || item.status) + " · " + new Date(item.created_at + "Z").toLocaleDateString("vi-VN");
      article.append(title, meta);
      container.appendChild(article);
    });
  }

  document.getElementById("supportRequestForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var button = form.querySelector('button[type="submit"]');
    var data = new FormData(form);
    var payload = {
      displayName: data.get("displayName"),
      contactMethod: data.get("contactMethod"),
      contactValue: data.get("contactValue"),
      subject: data.get("subject"),
      urgency: data.get("urgency"),
      description: data.get("description"),
      immediateRisk: data.get("immediateRisk") === "on",
      consent: data.get("consent") === "on",
      stressDepression: stressResult ? stressResult.depression : null,
      stressAnxiety: stressResult ? stressResult.anxiety : null,
      stressStress: stressResult ? stressResult.stress : null,
      stressSummary: stressResult ? stressResult.summary : null,
    };

    button.disabled = true;
    try {
      var result = await requestJson("/api/support", { method: "POST", body: JSON.stringify(payload) });
      showFormStatus(result.message, "ok");
      form.reset();
      stressResult = null;
      updateStressNote();
      if (currentUser) {
        document.getElementById("supportName").value = currentUser.name;
        document.getElementById("supportContact").value = currentUser.email;
        document.getElementById("supportMethod").value = "email";
      }
    } catch (error) {
      showFormStatus(error.message, "error");
    } finally {
      button.disabled = false;
    }
  });

  loadSession().then(updateStressNote);

  var params = new URLSearchParams(window.location.search);
  var requestedTab = params.get("support");
  if (["quiz", "share", "account"].includes(requestedTab)) openSupport(requestedTab);
})();
