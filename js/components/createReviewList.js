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

if (getUser() === null || getToken() === null) {
    location.href = "/login.html";
} else {

    const reviewUrl = baseUrl + "reviews?populate=*";
    const reviewsContainer = document.querySelector(".reviews__container")

    try {
        const response = await fetch(reviewUrl);
        const json = await response.json();
        console.log(json)
        
        if(json.data.length === 0){
            console.log("There is nothing her")
            reviewsContainer.innerHTML = `<div class="message">
            <p>You don't have any reviews yet</p>
            </div>`
        }

        const reviews = json.data;
        reviews.forEach(review => {
            const writtenBy = review.attributes.written_by.data
            
            reviewsContainer.innerHTML += `
            <div>
                <h3>${review.attributes.title}</h3>
                <p>${writtenBy.attributes.username}</p>
                <a href="/edit.html?id=${review.id}" > Edit </a>

            </div>
            `
        });
    } catch (error) {

    }

}