import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './fetch-photos.js';
import axios from 'axios';

const inputEl = document.querySelector('input[name = "searchQuery"]');
const submitBtnEL = document.querySelector('.submit');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

let page = Number(1);
let searchQuery = "";

if (galleryEl.innerHTML === "") {
    loadMoreBtnEl.disabled = true;
    loadMoreBtnEl.classList.add("visually-hidden");
}

submitBtnEL.addEventListener('click', onSubmitClick);
loadMoreBtnEl.addEventListener('click', onLoadMore)

function onSubmitClick(e) {
    e.preventDefault();
    onSearch(e);
}

async function onLoadMore(searchQuery) {
    searchQuery = inputEl.value.trim();
    page += 1;
    try {
        const result = await fetchPhotos(searchQuery, page)
        let photos = await addPhotos(result.data.hits)
        galleryEl.insertAdjacentHTML("beforeend", photos)
    }
    catch (error) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
        disableLoadMoreBtn();
        console.log(error.message)
    }

    const simplelightbox = new SimpleLightbox('.photo-card a', {
        captiondDelay: 250,
        captionsData: 'alt'
    })
    simplelightbox.refresh();
    console.log(`Page: ${page}`)


    const { height: cardHeight } = galleryEl
        .firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

async function onSearch(e) {
    e.preventDefault();
    searchQuery = inputEl.value.trim();
    if (searchQuery !== "") {
        try {
            page = 1;
            const result = await fetchPhotos(searchQuery, page)
            const photos = await addPhotos(result.data.hits)
            galleryEl.innerHTML = photos;
            disableLoadMoreBtn();
            const simplelightbox = new SimpleLightbox('.photo-card a', {
                captiondDelay: 250,
                captionsData: 'alt'
            })
            console.log(result.data.hits.length)
            console.log(`Page: ${page}`)
            if (result.data.hits.length === 0) {
                disableLoadMoreBtn();
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            } else Notiflix.Notify.success(`Hooray! We found ${result.data.totalHits} images.`)
            if (result.data.hits.length < 40) {
                loadMoreBtnEl.disabled = true;
                loadMoreBtnEl.classList.add("visually-hidden")
            } else {
                loadMoreBtnEl.disabled = false;
                loadMoreBtnEl.classList.remove("visually-hidden")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}


function addPhotos(photos) {
    return photos.map(photo => {
        return `<div class="photo-card">
    <a class="gallery__item" href ="${photo.largeImageURL}" >
    <img src="${photo.webformatURL}" class = "gallery__image" alt="${photo.tags}" loading="lazy" />
    </a>
    <div class="info">
        <p class="info-item">
            <b>Likes: ${photo.likes}</b>
        </p>
        <p class="info-item">
            <b>Views: ${photo.views}</b>
        </p>
        <p class="info-item">
            <b>Comments: ${photo.comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads: ${photo.downloads}</b>
        </p>
    </div>
</div>`;
    }).join('');
}

function disableLoadMoreBtn() {
    loadMoreBtnEl.disabled = true;
    loadMoreBtnEl.classList.add("visually-hidden")
}