import {
    displayMessage
} from "../components/displayMessage.js";
import {
    baseUrl
} from "../settings/api.js";
import {
    getToken,
    getUser
} from "../utils/storage.js";

const token = getToken();
const user = getUser();

if (!token && !user) {
    document.location.href = "/login.html";
}

const message = document.querySelector(".error__message__container")

const form = document.querySelector("form");
const titleInput = document.querySelector("#titleInput")
const writhenByInput = document.querySelector("#writhenByInput");
const bodyInput = document.querySelector("#bodyInput");
const ratingInput = document.querySelector("#ratingInput");

writhenByInput.value = user

form.addEventListener("submit", submitChanges);

function submitChanges(event) {
    event.preventDefault();
    message.innerHTML = "";

    const title = titleInput.value.trim();
    const writhenBy = writhenByInput.value.trim()
    const body = bodyInput.value.trim()
    const rating = ratingInput.value.trim()

    if (title.length === 5 || writhenBy.length === 0 || body.length === 20 || rating.length === 0) {
        document.querySelector(".error__message__container").innerHTML = "";
        return displayMessage("warning", "Please supply proper values", ".error__message__container");
    }

    creatReview(title, writhenBy, body, rating);
}
async function creatReview(title, writhenBy, body, rating) {
    const updateUrl = baseUrl + "reviews";

    const data = JSON.stringify({
        "data": {
            "title": title,
            "rating": rating,
            "body": body,
            "written_by": writhenBy
        }
    });

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const response = await fetch(updateUrl, options);
        const json = await response.json();

        if (json.error) {
            displayMessage("error", json.error.message, ".error__message__container");
        }

        displayMessage("something", "Your post has been created", ".error__message__container")
        window.location.href = "/dashboard.html"

    } catch (error) {
        console.log(error);
    }
}