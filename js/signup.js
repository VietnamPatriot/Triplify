const signupForm = document.getElementById("signupForm");
// --------------------------------------------
// kiem tra trung lap
function isEmailRegistered(username) {
  // kiem tra xem username da ton tai trong local storage chua
  if (localStorage.getItem(username) !== null) {
    alert("Username is already registered. Please use a different email.");
    return true;
  }
  return false;
}
// -----------------------------------------------------
// kiem tra form dang ki
function validateSignupForm(email, username, password, confirmPassword) {
  // kiem tra username (>= 6 ky tu)
  if (username.length < 6) {
    alert("Username must be at least 6 characters long.");
    return false;
  }
  // password (>= 6 ky tu)
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }
  return true;
}

// -----------------------------------------------------
// dang ki -> luu local storage
function signupToLocalStorage() {
  // lay du lieu tu form
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // kiem tra form
  const checked =
    validateSignupForm(email, username, password) && !isEmailRegistered(email);
  if (checked == true) {
    // luu vao local storage
    localStorage.setItem(
      email,
      JSON.stringify({ username: username, password: password })
    );
    // thong bao
    alert("Registration successful! You can now log in.");
    // chuyen sang dang nhap
    location.href = "./login.html";
  }
}

// -----------------------------------------------------
// bat su kien cho nut dang ki
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // ngan chan submit mac dinh (chuyen trang theo action/ sua url)
    signupToLocalStorage(); // goi ham dang ki
  });
