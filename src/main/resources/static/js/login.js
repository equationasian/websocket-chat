const signupForm = document.getElementById("login-form");
const successParam = new URLSearchParams(window.location.search);
if (successParam.has("registered")) {
    const errorMessage = signupForm.insertAdjacentHTML("beforebegin", "<div id='success-message'>Successfully registered</div>")
}
else if (successParam.has("error")) {
    const errorMessage = signupForm.insertAdjacentHTML("beforebegin", "<div id='error-message'>Invalid username or password</div>")
}