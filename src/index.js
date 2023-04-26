// import { fetchImages } from './js/fetch-Image';
// import { renderGallery } from './js/render-gallary';
import { renderGallery } from './js/gallery';
// import { renderGallery } from './js/markupBuild';
import { Notify } from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PixabayAPI } from './js/PixabayAPI';

const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

const api = new PixabayAPI();

form.addEventListener('submit', searchFunc);
loadMoreBtn.addEventListener('click', onLoadMore);

// spinnerPlay();

// window.addEventListener('load', () => {
//   spinnerStop();
// });

// loadMoreBtn.classList.add("is-hidden");

async function searchFunc(event) {

    event.preventDefault();
    api.query = event.currentTarget.searchQuery.value.trim();
    api.resetPage();
    // spinnerPlay();
    clearHitsMarkup()
try {
    const awaitFetch = await api.getImages();
    // console.log(awaitFetch);
    // console.log(awaitFetch.hits);
    // console.log(awaitFetch.totalHits);
    // spinnerPlay();

    if (!api.query) {
        showNotification('empty');
        return;
    }
    
    if (awaitFetch.array === 0) {
        showNotification('failure');
        gallery.innerHTML = '';
        return;
    }
    Notify.info(`Hooray! We found ${awaitFetch.total} images.`)
    renderGallery(awaitFetch.hits);
    loadMoreBtn.classList.remove("is-hidden");
    
    if (api.perPage * api.page > awaitFetch.totalHits) {
        loadMoreBtn.classList.add("is-hidden");
        showNotification('end')
    }
} catch (error) {
    console.log(error.message);
} 
}

async function onLoadMore() {
    api.updatePage()
    try {
        const awaitFetch = await api.getImages();
        renderGallery(awaitFetch.hits);
        //   scrollOn()
        //   spinnerPlay();

        // if (awaitFetch.data.totalHits < 40) {
        //   showNotification('end')
        //   loadMoreBtn.classList.add("is-hidden");
        //     return;
        // }

        if (api.perPage * api.page > awaitFetch.totalHits) {
            loadMoreBtn.classList.add("is-hidden");
            showNotification('end')
        }
    } catch (error) {
        console.log(error.message);
    }
}
// } finally {
//   spinnerStop();
// }};

function clearHitsMarkup() {
    gallery.innerHTML = '';
}

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
}



// function scrollOn () {
//   const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
// }