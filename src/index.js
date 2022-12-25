import './css/styles.css'

const inputEl = document.querySelector('input[name = "searchQuery"]');
const submitBtnEL = document.querySelector('.submit');
const loadMoreBtnEl = document.querySelector('.load-more')

console.log(loadMoreBtnEl)
const addCard = `<div class="photo-card">
    <img src="" alt="" loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes</b>    
        </p>
        <p class="info-item">
            <b>Views</b>
        </p>
        <p class="info-item">
            <b>Comments</b>
        </p>
        <p class="info-item">
            <b>Downloads</b>
        </p>
    </div>
</div>`;
