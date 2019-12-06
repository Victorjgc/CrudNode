const moviestext = [
  { name: "BatmanVSuperman", id: 1, likes: 0 },
  { name: "The Last Samurai", id: 2, likes: 1 }
];
import { MongoClient, Server, ObjectId } from "mongodb";
import { type } from "os";
import { mongo } from "mongoose";
const MONGO_URL = "mongodb://localhost:27017";

export function getMoviesMongo() {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db("movies");
        const moviesCollection = db.collection("movies");
        moviesCollection
          .find({})
          .limit(20)
          .toArray()
          .then(movies => resolve(movies))
          .catch(errorFind => reject(errorFind));
      } else {
        reject(err);
      }
    });
  });
}

export function getSingleMovieMongo(movieId: string) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db("movies");
        const moviesCollection = db.collection("movies");
        let findmovie = new ObjectId(movieId);
        moviesCollection
          .findOne({ _id: findmovie })
          .then(movie => resolve(movie))
          .catch(errorDelete => reject(errorDelete));
      } else {
        reject(err);
      }
    });
  });
}

export function createMovieMongo(moviemongo) {
  return new Promise((resolve, reject) => {
    let movieToInsert = {
      ...moviemongo,
      likes: 0,
      created: new Date(),
      updated: new Date()
    };
    MongoClient.connect(MONGO_URL, (err, client) => {
      if (!err) {
        const db = client.db("movies");
        const moviesCollection = db.collection("movies");
        async function contar() {
          try {
            return await moviesCollection.countDocuments();
          } catch (err) {}
        }
        console.log(contar());
        /*  movieToInsert = { ... moviemongo, likes: 0, id: contar(),   created: new Date(), updated: new Date() };*/

        moviesCollection
          .insertOne(movieToInsert)
          .then(() => resolve(getMoviesMongo()))
          .catch(insertError => reject(insertError));
      } else {
        reject(err);
      }
    });
  });
}

//sin usar mongo
export function getSessions() {
  return moviestext;
}

export function getMovies() {
  return moviestext;
}

export function getSingleMovie(movieId: string) {
  console.log(movieId);
  const movie = moviestext.find(movie => movie.id === parseInt(movieId));
  return movie;
}

export function createMovie(newMovie) {
  newMovie.id = moviestext[moviestext.length - 1].id + 1;
  newMovie.likes = 0;
  moviestext.push(newMovie);
  return moviestext;
}

export function deleteMovie(movieId: string) {
  const movie = moviestext.find(movie => movie.id === parseInt(movieId));
  const position = moviestext.indexOf(movie);
  moviestext.splice(position, 1); //NO LO ENTIENDO
  return moviestext;
}

export function updateMovie(movieId: string, movieName: string) {
  const movie = moviestext.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    return "Error";
  }
  // Ahora sólo actualizo el nombre
  movie.name = movieName;
  return moviestext;
}

export function addLikes(movieId: string) {
  const movie = moviestext.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    return "No se encuentra";
  } else {
    movie.likes++;
    return moviestext;
  }
}

export function removeLikes(movieId: string) {
  const movie = moviestext.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    return "No se encuentra";
  } else {
    movie.likes--;
    return moviestext;
  }
}
