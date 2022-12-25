import './css/styles.css'
import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPhotos } from './fetch-photos'

const inputEl = document.querySelector('input[name = "searchQuery"]');
const submitBtnEL = document.querySelector('.submit');
const loadMoreBtnEl = document.querySelector('.load-more')
const galleryEl = document.querySelector('.gallery')



console.log(inputEl)

inputEl.addEventListener('input', onSearch)


async function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value.trim();
    console.log(searchQuery)
    if (searchQuery !== "") {
        try {
            const result = await fetchPhotos(searchQuery)
            console.log(result)
            const photos = await createPhoto(result.hits)
        } catch (error) {
            console.log(error.message)
        }
    }
}

async function createPhoto(photos) {
    const createdPhotos = photos.map((photo) => {
        const mappedPhotos = `<div class="photo-card">
    <img src="${photo.webformatURL}" width = "400px"  alt="${photo.tags}" loading="lazy" />
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
</div>`
        console.log(mappedPhotos)
        return mappedPhotos;
    }).join('')
    galleryEl.innerHTML = createdPhotos
}