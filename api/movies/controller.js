
const movies = [{ name: 'BatmanVSuperman', id: 1, likes: 0 }, { name: 'The Last Samurai', id: 2, likes: 1 }];
function getMovies() {
    return movies;
}

function getSingleMovie() {
    const movieId = Number(req.params.id);
    const movie = movies.find(movie => movie.id === movieId);
    return movie;
}

function createMovie(newMovie) {
    newMovie.id = movies[movies.length - 1].id + 1;
    newMovie.likes = 0;
    movies.push(newMovie);
    return res.status(200).send('Película creada correctamente');
}


function deleteMovie(movieId) {
    const movie = movies.find(movie => movie.id === parseInt(movieId));
    const position = movies.indexOf(movie);
    movies.splice(position, 1);//NO LO ENTIENDO
    return res.status(200).send('Película eliminada correctamente');
}

function updateMovie(movieId) {
    const movie = movies.find(movie => movie.id === parseInt(movieId));
    if (!movie) {
        return res.status(400).send('Película no encontrada');
    }
    // Ahora sólo actualizo el nombre
    movie.name = req.body.name;
    return res.status(200).send('Película actualizada correctamente');
}

function addLikes(movieId) {

    const movie = movies.find(movie => movie.id === parseInt(movieId));
    if (!movie) {
        return res.status(400).send('Película no encontrada');
    } else {
        movie.likes++;
        return movies;
    }
}

function removeLikes(movieId) {

    const movie = movies.find(movie => movie.id === parseInt(movieId));
    if (!movie) {
        return res.status(400).send('Película no encontrada');
    } else {
        movie.likes--;
        return movies;
    }
}


module.exports = { getMovies, getSingleMovie, createMovie, deleteMovie, updateMovie, addLikes, removeLikes };
