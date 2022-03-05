import createMenu from "./components/createMenu.js";
import { displayMessage } from "./components/displayMessage.js";
import {baseUrl} from "./settings/api.js";

createMenu();

const reviewUrl = baseUrl + "reviews?populate=*";

(async function() {
    const reviewsContainer = document.querySelector(".reviews__container")

    try {
        const response = await fetch(reviewUrl);
        const json = await response.json();
        console.log(json)
        const reviews = json.data;
       
        if(reviews.length === 0){
            reviewsContainer.innerHTML = `<div class="message">
            <p>You don't have any reviews yet</p>
            </div>`
        }
        console.log(reviews)
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
        console.log(error)
        displayMessage("error", "There is missing something", ".error__message__container")
    }

})()