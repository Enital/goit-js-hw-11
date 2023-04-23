import axios from 'axios';

export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '35660997-4fd052661528ba3040eb8e5ad';    

    async getImages(data) {
        console.log('enter');
        const url = `${this.#BASE_URL}?key=${this.#API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch=true`;
    try {
        const response = await axios.get(url);
        console.log(response.hits);
        return response;
        }
    catch(error) {
            console.log(error);
        }
    }
}

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.