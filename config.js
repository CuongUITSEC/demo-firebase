// Nhập các thư viện Firebase cần thiết
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Cấu hình Firebase (Thay bằng thông tin từ Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyADXF3PgHf1vl-peRzZlqm-clMByAbZlDc",
  authDomain: "ltmang-firebase.firebaseapp.com",
  projectId: "ltmang-firebase",
  storageBucket: "ltmang-firebase.firebasestorage.app",
  messagingSenderId: "1019467231812",
  appId: "1:1019467231812:web:395b9f90387761d2a2c211",
  measurementId: "G-NBZTYDTW1Y",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
// Lấy đối tượng xác thực từ Firebase
const auth = getAuth(app);
// Tạo nhà cung cấp Google để đăng nhập
const provider = new GoogleAuthProvider();

// Kiểm tra trạng thái đăng nhập
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Nếu đã đăng nhập, hiển thị tên hoặc email người dùng
    document.getElementById("message").innerText = `Xin chào, ${
      user.displayName || user.email
    }`;
    // Hiển thị nút đăng xuất, ẩn nút đăng ký và nút đăng nhập
    document.getElementById("signOutBtn").style.display = "block";
    document.getElementById("signUpBtn").style.display = "none";
    document.getElementById("signInBtn").style.display = "none";
    document.getElementById("signInGoogleBtn").style.display = "none";
  } else {
    // Nếu chưa đăng nhập, hiển thị thông báo
    document.getElementById("message").innerText = "Bạn chưa đăng nhập.";
    // Ẩn nút đăng xuất
    document.getElementById("signOutBtn").style.display = "none";
    document.getElementById("signUpBtn").style.display = "block";
  }
});

// Xử lý đăng ký tài khoản
document.getElementById("signUpBtn").addEventListener("click", () => {
  // Lấy email và mật khẩu từ ô nhập
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Gọi Firebase API để đăng ký
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => alert("Đăng ký thành công!"))
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("Tài khoản đã tồn tại. Vui lòng đăng nhập hoặc dùng email khác.");
      } else {
        alert("Lỗi: " + error.message);
      }
    });
});

// Xử lý đăng nhập bằng Email/Password
document.getElementById("signInBtn").addEventListener("click", () => {
  // Lấy email và mật khẩu từ ô nhập
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Gọi Firebase API để đăng nhập
  signInWithEmailAndPassword(auth, email, password)
    .then(() => alert("Đăng nhập thành công!"))
    .catch(() => alert("Tài khoản hoặc mật khẩu không đúng")); // Xử lý lỗi
});

// Xử lý đăng nhập bằng Google
document.getElementById("signInGoogleBtn").addEventListener("click", () => {
  // Gọi Firebase API để đăng nhập bằng Google
  signInWithPopup(auth, provider)
    .then((result) => {
      alert(`Đăng nhập thành công! Chào, ${result.user.displayName}`);
    })
    .catch((error) => alert(error.message)); // Xử lý lỗi nếu có
});

// Xử lý đăng xuất
document.getElementById("signOutBtn").addEventListener("click", () => {
  // Gọi Firebase API để đăng xuất
  signOut(auth)
    .then(() => {
      alert("Bạn đã đăng xuất!");
      document.getElementById("signInBtn").style.display = "block";
      document.getElementById("signInGoogleBtn").style.display = "block";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    })
    .catch((error) => alert(error.message)); // Xử lý lỗi nếu có
});
