const signupForm = document.getElementById("login-form");
const successParam = new URLSearchParams(window.location.search);
if (successParam.has("registered")) {
    const errorMessage = signupForm.insertAdjacentHTML("beforebegin", "<div id='success-container'><span id='success-message'><i class='fa-solid fa-check'></i>Successfully registered</span></div>");
}
else if (successParam.has("error")) {
    const errorMessage = signupForm.insertAdjacentHTML("beforebegin", "<div id='success-container'><span id='error-message'><i class='fa-solid fa-xmark'></i>Invalid username or password</span></div>");
}