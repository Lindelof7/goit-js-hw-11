import Notiflix from "notiflix"

export async function fetchPhotos(searchQuery) {
    const response = await fetch(`https://pixabay.com/api/?key=32358654-06404774fd2fdef00d453a3c4&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&`);
    return response.json();
}

// return fetch(`https://pixabay.com/api/?key=32358654-06404774fd2fdef00d453a3c4&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
//     .catch((err) => console.error(err.message))
//     .then((r) => {
//         return r.json()
//     })