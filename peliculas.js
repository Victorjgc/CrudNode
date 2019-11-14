const express = require('express');
const app = express();
app.use(express.json());

const movies = [{ name: 'BatmanVSuperman', id: 1, likes: 0 }, { name: 'The Last Samurai', id: 2, likes: 1 }];
app.get('/', (req, res) => {
  res.json(movies);
});
//ask movies
app.get('/movies', (req, res) => {
  res.json(movies);
});
//ask a single movie
app.get('/movies/:id', (req, res) => {
  const movieId = Number(req.params.id);
  const movie = movies.find(movie => movie.id === movieId);
  res.json(movie);
});

//crear peliculas
app.post('/movies/create', (req, res) => {
  const newMovie = req.body;
  newMovie.id = movies[movies.length - 1].id + 1;
  newMovie.likes = 0;
  movies.push(newMovie);
  return res.status(200).send('Película creada correctamente');
});
//delete
app.post('/movies/delete/:id', (req, res) => {//DUDA: no recuerdo como evitar que al eliminar 1 los id se reseteen
  const movieId = req.params.id;
  const movie = movies.find(movie => movie.id === parseInt(movieId));
  const position = movies.indexOf(movie);
  movies.splice(position, 1);//NO LO ENTIENDO
  return res.status(200).send('Película eliminada correctamente');
});
//update
app.put('/movies/update/:id', (req, res) => {  //DUDA: no se como evitar que me elimine las pelícuas
  const movieId = req.params.id;
  const movie = movies.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    return res.status(400).send('Película no encontrada');
  }
  // Ahora sólo actualizo el nombre
  movie.name = req.body.name;
  return res.status(200).send('Película actualizada correctamente');
});


app.listen(3000, () => console.log('Ready on port 3000!'));

