import { PixabayAPI } from "./js/PixabayAPI";

const api = new PixabayAPI;

const inputFormDataEl = document.querySelector('#search-form');

inputFormDataEl.addEventListener('submit', loadImage);
const photoData = 'cat';
function loadImage(event) {
    event.preventDefault();
    api.getImages(event);
}

