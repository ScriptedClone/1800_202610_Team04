document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const error = document.getElementById("error");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // stop page refresh

    error.textContent = ""; // clear old error

    // check email
    if (!email.value.includes("@")) {
      error.textContent = "Please enter a valid email address.";
      return;
    }

    // check password
    if (password.value.length < 6) {
      error.textContent =
        "Password must be at least 6 characters and has a number.";
      return;
    }
    //redirect to login page
    window.location.href = "login.html";
  });
});
