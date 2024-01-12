const signupForm = document.getElementById("login-form");
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

    if (sendForm.ok) {
        //let json = await sendForm.text();
        console.log(formObject);
    }
    else {
        console.log("http error");
    }

    window.location.assign("login.html");
};