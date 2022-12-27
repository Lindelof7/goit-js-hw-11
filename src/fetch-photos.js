export async function fetchPhotos(searchQuery, page) {
    const response = await fetch(`https://pixabay.com/api/?key=32358654-06404774fd2fdef00d453a3c4&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
    return response.json();

}
// export async function fetchPhotos(searchQuery) {
//     const response = await axios.get(`https://pixabay.com/api/?key=32358654-06404774fd2fdef00d453a3c4&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&`);
//     console.log(response)
//     const data = await response.data.json();
// }




// return fetch(`https://pixabay.com/api/?key=32358654-06404774fd2fdef00d453a3c4&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
//     .catch((err) => console.error(err.message))
//     .then((r) => {
//         return r.json()
//     })