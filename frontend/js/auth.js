// ================= REGISTER =================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!name || !email || !password || !role) {
      alert("Please fill all fields");
      return;
    }

    const data = await registerUser({ name, email, password, role });

    if (data) {
      alert("✅ Registration successful");
      window.location.href = "login.html";
    }
  });
}


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const data = await loginUser({ email, password });

    if (data) {
      // Save JWT token
      setToken(data.token);

      // Save role
      localStorage.setItem("role", data.role);

      alert("✅ Login successful");

      // ROLE BASED REDIRECT
      if (data.role === "host") {
        window.location.href = "host.html";
      } else {
        window.location.href = "student.html";
      }
    }
  });
}


// ================= AUTO REDIRECT =================
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

if (token && role) {
  if (window.location.pathname.includes("login.html")) {
    if (role === "host") {
      window.location.href = "host.html";
    } else {
      window.location.href = "student.html";
    }
  }
}