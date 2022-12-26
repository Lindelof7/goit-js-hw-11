export async function fetchPhotos(searchQuery) {
    const response = await fetch(`https://pixabay.com/api/?key=32358654-06404774fd2fdef00d453a3c4&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&`);
    return await response.json();
}