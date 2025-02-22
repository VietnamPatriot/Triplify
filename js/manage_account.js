// tao bien luu tru 1 account co dinh
const defaultAccount = {
  username: "abc123",
  email: "abc123@gmail.com",
  password: "abc123",
};

// luu bien co dinh vao local storage
if (!localStorage.getItem("defaultAccount")) {
  // neu chua co du lieu trong storage => tao
  // JSON (chuoi - string): kieu du lieu dung de luu vao trong storage => js khong doc duoc
  // => chuyen kieu du lieu tu js -> json = func stringify()
  // localStorage.setItem("defaultAccount", JSON.stringify(defaultAccount));
}

// kiểm tra chưa đăng nhập => không được book phòng + nút account trỏ đến login
const currentUser = localStorage.getItem("currentUser"); // lay du lieu tu local storage
const account_btn = document.getElementById("account_link");
const book_btn = document.getElementById("book_submit_btn");
if (!currentUser) {
  // người dùng chưa đăng nhập
  account_btn.innerText = "Login";
  account_btn.href = "../html/login.html";
  book_btn.onclick = (event) => {
    event.preventDefault();
    alert("PLease login first to use this feature!")
  };
} else {
  // neu nguoi dung da dang nhap
  account_btn.innerText = "Account";
  account_btn.href = "#";
}