import createMenu from "./components/createMenu.js";
import {
    displayMessage
} from "./components/displayMessage.js";
import {
    baseUrl
} from "./settings/api.js";

createMenu();

const reviewUrl = baseUrl + "reviews?populate=*";
const loading = document.querySelector(".loading");

(async function () {
    const reviewsContainer = document.querySelector(".reviews__container")

    try {
        const response = await fetch(reviewUrl);
        const json = await response.json();
        const reviews = json.data;

        if (reviews.length === 0) {
            reviewsContainer.innerHTML = `<div class="message">
            <p>You don't have any reviews yet</p>
            </div>`
        }
        reviews.forEach(review => {
            reviewsContainer.innerHTML += `
            <div>
                <h3>${review.attributes.title}</h3>
               <p>Rating: <span class="badge bg-dark">${review.attributes.rating}</span></p>
                <p>${review.attributes.body}</p>
            </div>
            `
        });

    } catch (error) {
        displayMessage("error", `Reviews are missing. But you can login and add one`, ".error__message__container")
    } finally {
        loading.style.display = "none"
    }

})()