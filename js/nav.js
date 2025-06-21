const accountDropdown = document.getElementById("account-dropdown");
const loginBtn = document.getElementById("login-btn");
const email = document.getElementById("email");
const logoutBtn = document.getElementById("logoutBtn");
const changePasswordBtn = document.getElementById("changePasswordBtn");

// ---------------------------------------------
// kiem tra nguoi dung
const currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  // chua dang nhap -> hien thi login button
  loginBtn.classList.remove("hide");
  accountDropdown.classList.add("hide");
} else {
  // da dang nhap -> hien thi dropdown
  loginBtn.classList.add("hide");
  accountDropdown.classList.remove("hide");
  // sua ten email
  email.innerText = currentUser;
}

// ---------------------------------------------
// bat su kien cho logout button
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  window.location.reload();
});

// ---------------------------------------------
// bắt sự kiện cho changePassword button
changePasswordBtn.addEventListener("click", function () {
  const oldPasswordStored = JSON.parse(
    localStorage.getItem(currentUser)
  ).password;
  const oldPasswordInput = prompt("Old password: ");
  if (oldPasswordStored === oldPasswordInput) {
    const newPassword = prompt("New password: ");
    const confirmPassword = prompt("Confirm new password: ");
    if (newPassword === confirmPassword) {
      // luu lai vao local storage
      const user = JSON.parse(localStorage.getItem(currentUser));
      user.password = newPassword;
      localStorage.setItem(currentUser, JSON.stringify(user));
      alert("Password changed successfully");
      // xoa login -> dang nhap lai
      localStorage.removeItem("currentUser");
      window.location.reload();
    } else {
      alert("Xin lỗi, hai mật khẩu không khớp");
      return;
    }
  } else {
    alert("Xin lỗi, mật khẩu cũ không đúng");
    return;
  }
});
