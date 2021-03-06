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

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const form = document.querySelector("form");
const titleInput = document.querySelector("#titleInput")
const writhenByInput = document.querySelector("#writhenByInput");
const bodyInput = document.querySelector("#bodyInput");
const ratingInput = document.querySelector("#ratingInput");
const idInput = document.querySelector("#id");
const loading = document.querySelector(".loading");

(async function () {
    const reviewUrl = baseUrl + `reviews/${id}?populate=*`;

    try {
        const response = await fetch(reviewUrl);
        const details = await response.json();
        const review = details.data;

        const writhenBy = review.attributes.written_by.data.attributes.username

        titleInput.value = review.attributes.title
        writhenByInput.value = writhenBy
        bodyInput.value = review.attributes.body
        ratingInput.value = review.attributes.rating
        idInput.value = review.id;

    } catch (error) {
        displayMessage("error", "There is missing something", message)
    } finally {
        loading.style.display = "none"
    }

})();

form.addEventListener("submit", submitChanges);

function submitChanges(event) {
    event.preventDefault();
    message.innerHTML = "";

    const title = titleInput.value.trim();
    const writhenBy = writhenByInput.value.trim()
    const body = bodyInput.value.trim()
    const rating = ratingInput.value.trim()
    const idValue = idInput.value

    if (title.length === 0 || writhenBy.length === 0 || body.length === 0 || rating.length === 0) {
        document.querySelector(".error__message__container").innerHTML = "";
        return displayMessage("warning", "Please supply proper values", ".error__message__container");
    }
    updateReview(title, body, rating, idValue);
}

async function updateReview(title, body, rating, id) {
    const updateUrl = baseUrl + "reviews/" + id;

    const data = JSON.stringify({
        "data": {
            "title": title,
            "rating": rating,
            "body": body,
        }
    });

    const options = {
        method: "PUT",
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

        window.location.href = "/dashboard.html"

    } catch (error) {
        console.log(error);
    }
}