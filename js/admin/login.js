import {
    displayMessage
} from "../components/displayMessage.js";
import {
    baseUrl
} from "../settings/api.js";
import createMenu from "../components/createMenu.js";
import {
    saveToken,
    saveUser
} from "../utils/storage.js";

createMenu();

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message__container")

form.addEventListener("submit", submitLogin);

function submitLogin(event) {
    event.preventDefault();

    const usernameValue = username.value.toLowerCase().trim();
    const passwordValue = password.value.trim();
    message.innerHTML = "";

    if (usernameValue.length <= 3) {
        message.innerHTML += `<p>There is something wrong with your username</p>`;
        message.classList.add("warning")
    }
    if (passwordValue.length <= 4) {
        message.innerHTML += `<p>There is something wrong with your password</p>`;
        message.classList.add("warning")
    }

    userLogin(usernameValue, passwordValue)
}

async function userLogin(username, password) {
    const loginUrl = baseUrl + "auth/local";
    const data = JSON.stringify({
        identifier: username,
        password: password
    })

    const option = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        const response = await fetch(loginUrl, option);
        const json = await response.json();


        if (json.user) {

            const jwt = json.jwt
            const username = json.user.username;

            saveToken(jwt)
            saveUser(username)

            location.href = "/dashboard.html";
        }
        if (json.error) {
            displayMessage("warning", "your username and/or password is wrong", ".message__container")
        }
    } catch (error) {
        message.innerHTML = "";
        displayMessage("warning", "There is something wrong with the login. Plies comeback later and try again.", ".message__container")
    }
}