const loginForm = document.getElementById("loginForm");

// -----------------------------------------------------
// kiem tra trung lap
function isEmailRegistered(email) {
  // kiem tra xem email da ton tai trong local storage chua
  if (localStorage.getItem(email) !== null) {
    return true;
  }
  return false;
}

// -----------------------------------------------------
// dang nhap -> chuyen home
function loginToHome() {
  // lay du lieu tu form
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // kiem tra email da dang ki chua
  if (isEmailRegistered(email)) {
    const userInfo = JSON.parse(localStorage.getItem(email));
    // kiem tra password
    const passwordStored = userInfo.password;
    // so sanh password
    if (passwordStored === password) {
      // dang nhap thanh cong
      // luu current user vao local storage
      localStorage.setItem("currentUser", email);
      alert("Login successful! Redirecting to home page...");
      // chuyen trang
      window.location.href = "../index.html"; // chuyen den trang home
    } else {
      // mat khau khong dung
      alert("Incorrect password. Please try again.");
      return;
    }
  } else {
    // email chua dang ki
    alert("Email not registered. Please sign up first.");
    return;
  }
}

// -----------------------------------------------------
// bat su kien cho nut dang nhap
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // ngan chan submit mac dinh (chuyen trang theo action/ sua url)
    loginToHome(); // goi ham dang nhap
  });