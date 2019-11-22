const movies = [{ name: 'BatmanVSuperman', id: 1, likes: 0 }, { name: 'The Last Samurai', id: 2, likes: 1 }];

export function getSessions(){
    return movies;
}

export function getMovies() {
    return movies;
}

export function getSingleMovie(movieId) {
    console.log(movieId);
    const movie = movies.find(movie => movie.id === parseInt(movieId));
    return movie;
}

export function createMovie(newMovie) {
    newMovie.id = movies[movies.length - 1].id + 1;
    newMovie.likes = 0;
    movies.push(newMovie);
    return movies;
}

export function deleteMovie(movieId) {
    const movie = movies.find(movie => movie.id === parseInt(movieId)); 
    const position = movies.indexOf(movie);
    movies.splice(position, 1);//NO LO ENTIENDO
    return movies;
}

export function updateMovie(movieId, movieName) {
    const movie = movies.find(movie => movie.id === parseInt(movieId));
    if (!movie) {
        return "Error";
    }
    // Ahora sólo actualizo el nombre
    movie.name = movieName;
    return movies;
}

export function addLikes(movieId) {
    const movie = movies.find(movie => movie.id === parseInt(movieId));
    if (!movie) {
        return "No se encuentra";
    } else {
        movie.likes++;
        return movies;
    }
}

export function removeLikes(movieId) {
    const movie = movies.find(movie => movie.id === parseInt(movieId));
    if (!movie) {
        return "No se encuentra";
    } else {
        movie.likes--;
        return movies;
    }
}
