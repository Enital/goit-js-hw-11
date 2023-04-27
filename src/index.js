import { renderGallery } from './js/gallery';
import { sorryFunc } from './js/sorry';
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
    // console.log(api.query);
    if (!api.query) {
        // console.log('if');
        showNotification('empty');
        return;
    }
    api.resetPage();
    gallery.innerHTML = '';
try {
    const awaitFetch = await api.getImages();
    
    if (awaitFetch.totalHits === 0) {
        showNotification('failure');
        return;
    }
    Notify.success(`Hooray! We found ${awaitFetch.total} images.`)
    renderGallery(awaitFetch.hits);
    loadMoreBtn.classList.remove("is-hidden");

    if (api.perPage * api.currentPage > awaitFetch.totalHits & api.query) {
        showNotification('end');
        loadMoreBtn.classList.add("is-hidden");
        sorryFunc();
    }
} catch (error) {
    console.log(error.message);
} 
};

async function loadMoreFunc() {
    api.updatePage();
try {
    const awaitFetch = await api.getImages();
    renderGallery(awaitFetch.hits);
    if (api.perPage * api.currentPage > awaitFetch.totalHits) {
        showNotification('end');
        loadMoreBtn.classList.add("is-hidden");
        sorryFunc();
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