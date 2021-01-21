import './styles.css';
import './js/apiService';
import photoApiService from './js/apiService'
import galleryItem from './templates/gallery-item.hbs'
import LoadMoreBtn from './js/load-more-btn'

const searchRef = document.querySelector('#search-form');
const inputRef = searchRef.querySelector('.input');
const outputRef = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});



searchRef.addEventListener('submit', searchHandler)
loadMoreBtn.refs.button.addEventListener('click', fetchPhotos)

function searchHandler(e) {
    e.preventDefault();
    
    const form = e.currentTarget;
    photoApiService.query = form.elements.query.value;
    outputRef.innerHTML = ''

    if (photoApiService.query === '') {
        return alert('please try again');
      }

    loadMoreBtn.show();
    photoApiService.resetPage();
    clearOutput();
    fetchPhotos();
    form.reset();
}

function fetchPhotos() {
    loadMoreBtn.disable();

    photoApiService
    .fetchPhotos()
    .then(hits => {
        updateMarkup(hits);        
        loadMoreBtn.enable();
        window.scrollTo({
            top: 20000000000000000000,
            behavior: 'smooth',
          });    
      });
}


function updateMarkup(hits) {
    outputRef.insertAdjacentHTML('beforeend', galleryItem(hits));
}

function clearOutput() {
    outputRef.innerHTML = '';
}