function LoginValidate() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "") {
        alert("Enter Username");
        return;
    }

    if (password == "") {
        alert("Enter Password");
        return;
    }

    if (username == "admin" && password == "anits") {

        alert("Login Successful");

        window.location.href = "success.html";

    } else {

        alert("Invalid Username or Password");

    }

}