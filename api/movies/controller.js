const fs = require("fs");
const filePath = "./api/movies/movies_data.txt";
const movies = [
  { name: "BatmanVSuperman", id: 1, likes: 0 },
  { name: "The Last Samurai", id: 2, likes: 1 }
];
//const contenido = JSON.stringify(movies);//nota para mi, esto se hace una vez para tener un inicio. Borrar esta función pues estaría reescribiando el fichero
/*fs.writeFile(filePath, contenido, err => {//siempre con la mismo info. Habŕía que moverlo mas abajo para que guarde la info que metamos en postman
    if (err) {
        console.err('Error', err);
    } else {
        console.log('Fichero guardado correctamen', contenido);
    }
});*/

/*
function loadMovies (ficheroALeer) {
    
return new PRomise((resolve, reject) =>
    fs.readfile(ficheroALeer, (err,data) => {
        if(err){
            reject(err);
        } else{
            const resultado = cuentolasb(data);
            resolve(resultado);
    }))
}
const resultado = await contarlebtrab('asa.txt');

*/

//para leer ficheros
function loadMovies() {
  console.log(fs.readFileSync(filePath, "utf8"));
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getMovies() {
  return movies;
}

function getSingleMovie(movieId) {
  console.log(movieId);
  const movie = movies.find(movie => movie.id === parseInt(movieId));
  return movie;
}

//para escribir ficheros
function writteInFile(newMovie) {
  let movies = loadMovies();
  console.log(movies);
  newMovie.id = movies[movies.length - 1].id + 1;
  newMovie.likes = 0;
  movies.push(newMovie);
  let jsonMovies = JSON.stringify(movies);
  fs.writeFile(filePath, jsonMovies, err => {
    if (err) {
      console.err("Error", err);
    } else {
      console.log("Fichero guardado correctamente", jsonMovies);
    }
  });
  return movies;
}

function createMovie(newMovie) {
  newMovie.id = movies[movies.length - 1].id + 1;
  newMovie.likes = 0;
  movies.push(newMovie);
  return movies;
}

function deleteMovie(movieId) {
  const movie = movies.find(movie => movie.id === parseInt(movieId));
  S;
  const position = movies.indexOf(movie);
  movies.splice(position, 1); //NO LO ENTIENDO
  return res.status(200).send("Película eliminada correctamente");
}

function updateMovie(movieId) {
  const movie = movies.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    return res.status(400).send("Película no encontrada");
  }
  // Ahora sólo actualizo el nombre
  movie.name = req.body.name;
  return res.status(200).send("Película actualizada correctamente");
}

function addLikes(movieId) {
  const movie = movies.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    return res.status(400).send("Película no encontrada");
  } else {
    movie.likes++;
    return movies;
  }
}

function removeLikes(movieId) {
  const movie = movies.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    return res.status(400).send("Película no encontrada");
  } else {
    movie.likes--;
    return movies;
  }
}

module.exports = {
  getMovies,
  getSingleMovie,
  createMovie,
  deleteMovie,
  updateMovie,
  addLikes,
  removeLikes,
  loadMovies,
  loadMovies,
  writteInFile
};
