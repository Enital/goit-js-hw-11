import { PixabayAPI } from "./js/PixabayAPI";
import { Notify } from "notiflix";
import simpleLightbox from "simplelightbox";

const api = new PixabayAPI;
// const refs = {
// card:
    
// }
const inputFormDataEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('.load-more')

inputFormDataEl.addEventListener('submit', loadImage);
loadMoreBtnEl.addEventListener('click', loadMoreFunc);

// const photoData = 'cat';
function loadImage(event) {    
    event.preventDefault();
    console.log(inputFormDataEl);
    inputData = inputFormDataEl.searchQuery.value.trim();
    // console.log(inputData);
    api.getImages(inputData);
}

async function loadMoreFunc() {
    try {
        
    } catch (error) {
        
    }
}