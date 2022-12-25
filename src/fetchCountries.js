import Notiflix from "notiflix"

export function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=name,capital,population,flags,languages`)
        .catch((err) => console.error(err.message))
        .then((r) => {
            if (!r.ok) {
                Notiflix.Notify.failure("Oops, there is no country with that name");
                throw new Error(r.status)
            } return r.json()
        })
}
