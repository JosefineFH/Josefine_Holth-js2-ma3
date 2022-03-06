import {
    baseUrl
} from "../settings/api.js";
import {
    getToken,
    getUser
} from "../utils/storage.js";
import createMenu from "./createMenu.js";
import {
    displayMessage
} from "./displayMessage.js";

createMenu();

const token = getToken();
const user = getUser();

if (!token && !user) {
    document.location.href = "/login.html";
}

const reviewUrl = baseUrl + "reviews?populate=*";
const reviewsContainer = document.querySelector(".reviews__container")

try {
    const response = await fetch(reviewUrl);
    const json = await response.json();
    const reviewData = json.data

    reviewData.forEach(review => {
        const writtenBy = review.attributes.written_by.data
        if (user === writtenBy.attributes.username) {
            reviewsContainer.innerHTML += `
                     <div>
                        <h3>${review.attributes.title}</h3>
                        <p>${writtenBy.attributes.username}</p>
                        <a href="/edit.html?id=${review.id}">Edit this post</a>
                     </div>
                     `
        } else {
            reviewsContainer.innerHTML = `
            <div>
               <h3>There is no reviews written by you just yeat</h3>
               <div class="mb-5">
               <a href="/create.html" type="button" class="btn btn-light">Create review article her</a>
             </div>
            </div>
            `
        }
    });

} catch (error) {
    displayMessage("warning", "Something whent wrong whene loading", ".message__container")
}