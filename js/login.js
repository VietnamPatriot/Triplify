// lay thong tin nguoi dung nhap vao form => kiem tra thong tin
function validateForm(email, password) {
  // kiem tra rong
  if (email == "" || password == "") {
    alert("You need to fill all fields!");
    return false;
  }
  // tao bien kiem tra cu phap
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  // kiem tra format email
  if (email_regex.test(email) == false) {
    alert("Email is bad format!");
    return false;
  }
  // kiem tra format password
  if (password.length < 6) {
    alert("Password needs least 6 letters!");
    return false;
  }
  return true; // du lieu chinh xac
}

// luu vao local storage => kiem tra trang thai co login chua
function checkLoginAccount(defaultAccount) {
  // lay du lieu tu form HTML (element)
  // [HTML DOM]: mỗi tag trong html </> được gọi là element
  // document: lấy toàn bộ code trong file HTML đã được liên kết (thông qua tag script)
  // getElementById: lấy tag html thông qua thuộc tính id (vd: <input id="a"/>)
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // kiem tra form
  if (validateForm(email, password)) {
    // so sanh du lieu nhap vao voi du lieu trong may co san
    if (defaultAccount.email == email) {
      // dung email -> so sanh password
      if (defaultAccount.password == password) {
        alert("Login successfully!");
        // luu lại thông tin đăng nhập
        localStorage.setItem("currentUser", email);
        // chuyen sang index
        location.href = "../index.html";
        return; // kiem tra xong -> thoat ham -> khong lam gi them
      } else {
        // sai password
        alert("Password is incorrect!");
        return;
      }
    } else {
      // sai email
      alert("Email is not exist in database, please change to signup form!");
      return;
    }
  } else return; // sai du lieu nhap vao -> khong lam gi them
}

// bat su kien cho button login
document
  .getElementById("login-btn")
  .addEventListener("click", function (event) {
    // chan event mac dinh
    event.preventDefault();
    // lay lai du lieu tai khoan mac dinh trong local storage
    // getItem: tra ve du lieu json -> su dung ham parse() chuyen thanh kieu du lieu js
    const defaultAccount = JSON.parse(localStorage.getItem("defaultAccount"));
    checkLoginAccount(defaultAccount);
  });