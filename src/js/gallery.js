import SimpleLightbox from 'simplelightbox';
export { renderGallery as renderGallery }
const gallery = document.querySelector('.gallery')

function renderGallery (photo) {
    const galleryRender = photo
    .map(photo => {const 
    {webformatURL, largeImageURL, tags, likes, views, comments, downloads} = photo;
        return `
    <a class="gallery-item" href="${largeImageURL}">
        <div class="photo-card">
    
            <img class="photoImg" src="${webformatURL}" alt="${tags}" loading="lazy" height="200" width="280"/>
        
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${downloads}
                </p>
            </div>
        </div>
    </a>    
    `;
    }
    )
    gallery.insertAdjacentHTML('beforeend', galleryRender.join(''));
    simpleLightBox.refresh();
};
const simpleLightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt', 
    captionDelay: 250,
});