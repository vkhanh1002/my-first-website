const USERS_KEY = "bs_users";
const SESSION_KEY = "bs_session";
const FAIL_KEY = "bs_fail";

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
function saveUsers(arr) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr));
}
function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}
function saveSession(user, remember) {
  const exp = remember ? Date.now() + 7 * 24 * 3600 * 1000 : null;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ ...user, exp }));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function getFailData() {
  return JSON.parse(
    localStorage.getItem(FAIL_KEY) || '{"count":0,"lockedUntil":0}',
  );
}
function recordFail() {
  const d = getFailData();
  d.count++;
  if (d.count >= 5) d.lockedUntil = Date.now() + 30000;
  localStorage.setItem(FAIL_KEY, JSON.stringify(d));
  return d;
}
function resetFail() {
  localStorage.removeItem(FAIL_KEY);
}
function isLocked() {
  const d = getFailData();
  if (d.lockedUntil && Date.now() < d.lockedUntil) return d.lockedUntil;
  if (d.lockedUntil && Date.now() >= d.lockedUntil) resetFail();
  return false;
}

function toast(msg, type = "info") {
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.getElementById("toaster").appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

function showPanel(id) {
  document
    .querySelectorAll(".panel")
    .forEach((p) => p.classList.remove("active"));
  const el = document.getElementById("panel-" + id);
  if (el) el.classList.add("active");
  clearErrors();

  if (id === "login") {
    document.title = "Đăng nhập – Inkognito";
  } else if (id === "register") {
    document.title = "Đăng ký – Inkognito";
  } else if (id === "forgot" || id === "forgot-ok") {
    document.title = "Quên mật khẩu – Inkognito";
  }
}

function togglePass(id, btn) {
  const inp = document.getElementById(id);
  if (inp.type === "password") {
    inp.type = "text";
    btn.textContent = "🙈";
  } else {
    inp.type = "password";
    btn.textContent = "👁";
  }
}

function setErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  const inp =
    el.previousElementSibling?.tagName === "INPUT"
      ? el.previousElementSibling
      : el.parentElement.querySelector("input");
  if (inp) inp.classList.add("error");
}

function clearErrors() {
  document.querySelectorAll(".field-error").forEach((e) => {
    e.classList.remove("show");
    e.textContent = "";
  });
  document
    .querySelectorAll("input")
    .forEach((i) => i.classList.remove("error"));
  document.getElementById("lock-warning").classList.remove("show");
}

function isValidEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function setLoading(btnId, on) {
  const btn = document.getElementById(btnId);
  if (on) {
    btn.classList.add("loading");
    btn.disabled = true;
  } else {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

function updateNavbar() {
  const sess = getSession();
  const loginBtn = document.getElementById("nav-login-btn");
  const registerBtn = document.getElementById("nav-register-btn");
  const userInfo = document.getElementById("nav-user-info");
  const loggedDiv = document.getElementById("logged-in-card");

  if (sess && (!sess.exp || Date.now() < sess.exp)) {
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    userInfo.style.display = "flex";
    document.getElementById("nav-avatar").textContent =
      sess.name[0].toUpperCase();
    document.getElementById("nav-username").textContent = sess.name
      .split(" ")
      .pop();
    loggedDiv.style.display = "block";
    document.getElementById("card-avatar").textContent =
      sess.name[0].toUpperCase();
    document.getElementById("card-username").textContent = sess.name;
    document
      .querySelectorAll(".panel")
      .forEach((p) => p.classList.remove("active"));
  } else {
    loginBtn.style.display = "";
    registerBtn.style.display = "";
    userInfo.style.display = "none";
    loggedDiv.style.display = "none";
    clearSession();

    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get("action");

    if (action === "register") {
      showPanel("register");
    } else if (action === "forgot") {
      showPanel("forgot");
    } else {
      showPanel("login");
    }
  }
}

function doLogin() {
  clearErrors();
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-pass").value;
  const remember = document.getElementById("remember-me").checked;
  let ok = true;
  if (!email) {
    setErr("err-login-email", "Vui lòng nhập email.");
    ok = false;
  } else if (!isValidEmail(email)) {
    setErr("err-login-email", "Email không hợp lệ.");
    ok = false;
  }
  if (!pass) {
    setErr("err-login-pass", "Vui lòng nhập mật khẩu.");
    ok = false;
  }
  if (!ok) return;
  const lockedUntil = isLocked();
  if (lockedUntil) {
    showLockCountdown(lockedUntil);
    return;
  }
  setLoading("btn-login", true);
  setTimeout(() => {
    setLoading("btn-login", false);
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === pass);
    if (!user) {
      const d = recordFail();
      const remaining = 5 - d.count;
      if (d.lockedUntil) {
        showLockCountdown(d.lockedUntil);
        toast("Tài khoản bị khoá 30 giây do nhập sai quá nhiều lần.", "error");
      } else {
        setErr(
          "err-login-pass",
          `Email hoặc mật khẩu không đúng. Còn ${remaining} lần thử.`,
        );
        toast("Thông tin đăng nhập không chính xác!", "error");
      }
      return;
    }
    resetFail();
    saveSession(user, remember);
    toast(`Chào mừng, ${user.name}! 🎉`, "success");
    setTimeout(updateNavbar, 400);
  }, 900);
}

function showLockCountdown(until) {
  const warning = document.getElementById("lock-warning");
  warning.classList.add("show");
  const tick = () => {
    const left = Math.max(0, Math.ceil((until - Date.now()) / 1000));
    document.getElementById("lock-countdown").textContent = left;
    if (left > 0) setTimeout(tick, 1000);
    else {
      warning.classList.remove("show");
      resetFail();
    }
  };
  tick();
}

function doRegister() {
  clearErrors();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const pass = document.getElementById("reg-pass").value;
  const pass2 = document.getElementById("reg-pass2").value;
  let ok = true;
  if (!name) {
    setErr("err-reg-name", "Vui lòng nhập họ tên.");
    ok = false;
  }
  if (!email) {
    setErr("err-reg-email", "Vui lòng nhập email.");
    ok = false;
  } else if (!isValidEmail(email)) {
    setErr("err-reg-email", "Email không hợp lệ.");
    ok = false;
  }
  if (!pass) {
    setErr("err-reg-pass", "Vui lòng nhập mật khẩu.");
    ok = false;
  } else if (pass.length < 6) {
    setErr("err-reg-pass", "Mật khẩu tối thiểu 6 ký tự.");
    ok = false;
  }
  if (!pass2) {
    setErr("err-reg-pass2", "Vui lòng xác nhận mật khẩu.");
    ok = false;
  } else if (pass !== pass2) {
    setErr("err-reg-pass2", "Mật khẩu xác nhận không khớp.");
    ok = false;
  }
  if (!ok) return;
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    setErr("err-reg-email", "Email này đã được đăng ký.");
    return;
  }
  setLoading("btn-register", true);
  setTimeout(() => {
    setLoading("btn-register", false);
    const newUser = { id: Date.now(), name, email, password: pass };
    users.push(newUser);
    saveUsers(users);
    saveSession(newUser, false);
    toast(`Đăng ký thành công! Chào ${name} 🎉`, "success");
    setTimeout(updateNavbar, 400);
  }, 900);
}

function doForgot() {
  clearErrors();
  const email = document.getElementById("forgot-email").value.trim();
  if (!email) {
    setErr("err-forgot-email", "Vui lòng nhập email.");
    return;
  }
  if (!isValidEmail(email)) {
    setErr("err-forgot-email", "Email không hợp lệ.");
    return;
  }
  setLoading("btn-forgot", true);
  setTimeout(() => {
    setLoading("btn-forgot", false);
    showPanel("forgot-ok");
    toast("Đã gửi email đặt lại mật khẩu.", "info");
  }, 1000);
}

function logout() {
  clearSession();
  toast("Đã đăng xuất thành công.", "info");
  setTimeout(() => {
    updateNavbar();
    showPanel("login");
  }, 300);
}

document.addEventListener("DOMContentLoaded", updateNavbar);
