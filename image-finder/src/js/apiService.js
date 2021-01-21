const API_KEY = '19909927-fcc43bada1ed0b041cb82d2da'
const BASE_URL = 'https://pixabay.com/api'


export default {
    
    searchQuery: '',
    page: 1,
    fetchPhotos() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        
        return fetch(url)
        .then(res => res.json())
        .then(({hits}) => {
        this.incrementPage(); 
        
        return hits;
        });
    },

    incrementPage() {
        this.page += 1;
    },
    
    resetPage() {
        this.page = 1;
    },

    get query() {
        return this.searchQuery;
    },
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    },
}