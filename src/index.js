import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPhotos } from './fetch-photos.js';

const inputEl = document.querySelector('input[name = "searchQuery"]');
const submitBtnEL = document.querySelector('.submit');
const loadMoreBtnEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

inputEl.addEventListener('input', async (event) => {
    event.preventDefault();
    const searchQuery = event.target.value.trim();
    if (searchQuery !== '') {
        try {
            const result = await fetchPhotos(searchQuery);
            spawnPhotos(result.hits);
        } catch (error) {
            console.error(error.message);
        }
    }
});

function spawnPhotos(photos) {
    galleryEl.innerHTML = photos.map(photo => {
            return `<div class="photo-card">
    <img src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes ${photo.likes}</b>
        </p>
        <p class="info-item">
            <b>Views ${photo.views}</b>
        </p>
        <p class="info-item">
            <b>Comments ${photo.comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${photo.downloads}</b>
        </p>
    </div>
</div>`;
    }).join('');
}
