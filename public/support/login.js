(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var nextValue = params.get("next") || "/?support=account";

  function safeNext() {
    try {
      var destination = new URL(nextValue, window.location.origin);
      return destination.origin === window.location.origin ? destination.pathname + destination.search : "/";
    } catch {
      return "/";
    }
  }

  function showStatus(id, message, type) {
    var status = document.getElementById(id);
    status.textContent = message;
    status.className = "portal-status show " + type;
  }

  async function requestJson(url, options) {
    var response = await fetch(url, Object.assign({ headers: { "Content-Type": "application/json" } }, options));
    var payload = await response.json().catch(function () { return {}; });
    if (!response.ok) throw new Error(payload.message || "Không thể xử lý yêu cầu.");
    return payload;
  }

  function selectMode(mode) {
    var login = mode !== "register";
    document.getElementById("loginForm").hidden = !login;
    document.getElementById("registerForm").hidden = login;
    document.querySelectorAll("[data-auth-tab]").forEach(function (tab) {
      tab.setAttribute("aria-selected", tab.getAttribute("data-auth-tab") === (login ? "login" : "register") ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-auth-tab]").forEach(function (tab) {
    tab.addEventListener("click", function () {
      selectMode(tab.getAttribute("data-auth-tab"));
    });
  });

  document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var button = form.querySelector("button");
    var data = new FormData(form);
    button.disabled = true;
    try {
      await requestJson("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: data.get("email"), password: data.get("password") }),
      });
      showStatus("loginStatus", "Đăng nhập thành công. Đang chuyển trang...", "ok");
      window.setTimeout(function () { window.location.assign(safeNext()); }, 350);
    } catch (error) {
      showStatus("loginStatus", error.message, "error");
    } finally {
      button.disabled = false;
    }
  });

  document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var button = form.querySelector("button");
    var data = new FormData(form);
    button.disabled = true;
    try {
      await requestJson("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: data.get("name"), email: data.get("email"), password: data.get("password") }),
      });
      showStatus("registerStatus", "Tạo tài khoản thành công. Đang chuyển trang...", "ok");
      window.setTimeout(function () { window.location.assign(safeNext()); }, 350);
    } catch (error) {
      showStatus("registerStatus", error.message, "error");
    } finally {
      button.disabled = false;
    }
  });

  async function showExistingSession() {
    try {
      var payload = await requestJson("/api/auth/me", { method: "GET", headers: {} });
      if (!payload.user) return;
      document.querySelector(".auth-tabs").hidden = true;
      document.getElementById("loginForm").hidden = true;
      document.getElementById("registerForm").hidden = true;
      var session = document.getElementById("authSession");
      session.hidden = false;
      session.innerHTML = '<h2>Bạn đã đăng nhập</h2><p class="auth-help" id="sessionIdentity"></p><div class="auth-points"><a class="portal-button" id="sessionContinue" href="#">Tiếp tục</a><button class="portal-button-secondary" id="sessionLogout" type="button">Đăng xuất</button></div>';
      document.getElementById("sessionIdentity").textContent = payload.user.name + " · " + payload.user.email;
      document.getElementById("sessionContinue").href = payload.user.role === "admin" && nextValue === "/?support=account" ? "/quan-ly.html" : safeNext();
      document.getElementById("sessionLogout").addEventListener("click", async function () {
        await requestJson("/api/auth/logout", { method: "POST", body: "{}" });
        window.location.reload();
      });
    } catch {
      return;
    }
  }

  selectMode(params.get("mode") === "register" ? "register" : "login");
  showExistingSession();
})();
