import * as express from 'express';
import  { getMovies, getSingleMovie, createMovie, deleteMovie, updateMovie, addLikes, removeLikes, getSessions, getMoviesMongo, getSingleMovieMongo, createMovieMongo } from './controller';
const router = express.Router();


router.get('/session', (req, res) => {  
    if (req.session.views) {
        const x = req.session.views++;
        console.log(x);
        res.json(getSessions());
    } else {
        req.session.views = 1;
        res.json(getSessions());
    }
});
router.get('/mongo', (req, res) =>  { getMoviesMongo().then(movies => res.json(movies)).catch(err => res.status(500).send(err)); });

router.get('/singlemongo/:id', (req, res) => {
    getSingleMovieMongo(req.params.id).then(movie => res.json(movie)).catch(err => res.status(500).send(err));
});
router.post('/createmongo', (req, res) => {
    createMovieMongo(req.body).then(result => res.json(result)).catch(err => res.status(400).send(err));
});
//sin usar base de datos
router.get('/', (req, res) => res.json(getMovies()));
router.get('/:id', (req, res) => res.json(getSingleMovie(req.params.id)));
router.post('/create', (req, res) => res.json(createMovie(req.body)));
router.post('/delete/:id', (req, res) => res.json(deleteMovie(req.params.id)));
router.put('/update/:id', (req, res) => res.json(updateMovie(req.params.id, req.params.name)));
router.put('/add/likes/:id', (req, res) => res.json(addLikes(req.params.id)));
router.put('/delete/likes/:id', (req, res) => res.json(removeLikes(req.params.id)));

export = router;