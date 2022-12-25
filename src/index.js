import './css/styles.css';
import { fetchCountries } from './fetchCountries.js'
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box')
const countryListEl = document.querySelector('.country-list')
const countryInfoEl = document.querySelector('.country-info')


inputEl.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(e) {
    e.preventDefault();
    const searchQuery = e.target.value.trim();

    clearList();

    if (searchQuery !== "") {
        fetchCountries(searchQuery)
            .then((data) => { createCountryList(data) })
            .catch((err) => { console.error(err.message) })
    }
}

function createCountryList(countries) {

    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
    }

    if (countries.length < 10 && countries.length > 1) {
        const markupCountriesList = countries.map((country) =>
            `<li class="country"><img width = 55; src="${country.flags.svg}"      
        alt="Flag of ${country.name.official}" />      <h1 class = "country-title">${country.name.official}</h1></li>`)
            .join('');
        countryListEl.innerHTML = markupCountriesList;
        return;
    }

    if (countries.length = 1) {
        const markupCountryInfo = countries.map((country) => {
            const mappedCountries = `<div class= "flag-name-wrap"> <div class="big-country"><img width = 40; src="${country.flags.png}"      
        alt="Flag of ${country.name.official}" />      <ul class= "title-list"><h1 class = "big-country-name">${country.name.official}</h1> </div>
         <h1 class = "big-country-capital"><div class= "capital">Capital: </div> ${country.capital}</h1>
          <h1 class = "big-country-population"><div class= "population"> Population: </div> ${country.population}</h1>
           <h1 class = "big-country-languages"><div class= "languages">Languages: </div> ${mappedLanguages(country.languages)}</h1> <ul></div>`

            return mappedCountries;
        }).join('');


        countryInfoEl.innerHTML = markupCountryInfo;
    }
}

function clearList() {
    countryInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
}

function mappedLanguages(languages) {
    const languagesArr = [];
    for (let lang in languages) {
        languagesArr.push(languages[lang]);
    }
    return languagesArr.join(", ");
}