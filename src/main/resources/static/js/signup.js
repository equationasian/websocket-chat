const signupForm = document.getElementById("login-form");
const errorParam = new URLSearchParams(window.location.search);
if (errorParam.has("error")) {
    const errorMessage = signupForm.insertAdjacentHTML("beforebegin", "<div id='success-container'><span id='error-message'><i class='fa-solid fa-xmark'></i>Username already exists</span></div>")
}

signupForm.onsubmit = async (e) => {
    e.preventDefault();

    let formObject = {};
    const form = new FormData(signupForm);
    form.forEach((value, key) => formObject[key] = value);

    const sendForm = await fetch("/signup.html", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formObject)
    });

    let result = await sendForm;
    window.location.href = result.url;
};