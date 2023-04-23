import axios from 'axios';

export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '35660997-4fd052661528ba3040eb8e5ad';
    #query = '';

    constructor() {
        this.perPage = 40;
        currentPage = 1;
    }

    async getImages(query) {
        // console.log('enter qetimage');
        const url = `${this.#BASE_URL}?key=${this.#API_KEY}&q=${this.#query}&image_type=photo&orientation=horizontal&safesearch=true`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response?.data;
        }
    catch(error) {
            console.log(error);
        }
    }

    updatePage() {
        return this.currentPage += 1;
    }

    set query(newQuery) {
        this.#query = newQuery;
    }
}