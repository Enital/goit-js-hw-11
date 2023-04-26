import { renderGallery } from './js/gallery';
import { Notify } from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './js/PixabayAPI';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more-btn');
const gallery = document.querySelector('.gallery');

const api = new PixabayAPI();
form.addEventListener('submit', searchFunc);
loadMoreBtn.addEventListener('click', loadMoreFunc);

loadMoreBtn.classList.add("is-hidden");

async function searchFunc(event) {
    event.preventDefault();
    api.query = event.currentTarget.searchQuery.value.trim();
    api.resetPage();
    gallery.innerHTML = '';
try {
    const awaitFetch = await api.getImages();

    if (!api.query) {
        showNotification('empty');
        return;
    }
    else if (awaitFetch.totalHits === 0) {
        showNotification('failure');
        gallery.innerHTML = '';
        return;
    }
    let maxItems = api.perPage * api.currentPage;
    console.log(maxItems);
    if (api.perPage * api.currentPage > awaitFetch.totalHits) {
        endCollection();
        return;
    }
    else {
        Notify.info(`Hooray! We found ${awaitFetch.total} images.`)
        renderGallery(awaitFetch.hits);
        loadMoreBtn.classList.remove("is-hidden");
        return;
    }
} catch (error) {
    console.log('qwerqwer');
    console.log(error);
} 
};

async function loadMoreFunc() {
    api.updatePage();
    console.log(api.currentPage);
    console.log(api.perPage);
    try {
        if (api.perPage * api.currentPage > awaitFetch.totalHits) {
            const awaitFetch = await api.getImages();
            renderGallery(awaitFetch.hits);
            endCollection;
        }
    } catch (error) {
        console.log(error.message);
    }
};

const showNotification = (status) => {
    if (status === 'failure') {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    if (status === 'end') {
        Notify.info('We`re sorry, but you`ve reached the end of search results.')
    }
    if (status === 'empty') {
        Notify.info('Fill the form for searching')
    }
};

function endCollection() {
    if (api.perPage * api.currentPage > awaitFetch.totalHits) {
        loadMoreBtn.classList.add("is-hidden");
        showNotification('end');
    }
};