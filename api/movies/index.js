const express = require('express');
const router = express.Router();
let controller = require('./controller');

router.get('/load', (req, res) => res.json(controller.loadMovies()));
router.get('/', (req, res) => res.json(controller.getMovies()));
router.get('/:id', (req, res) => res.json(controller.getSingleMovie(req.params.id)));
router.post('/writtefile', (req, res) => res.json(controller.writteInFile(req.body)));
router.post('/create', (req, res) => res.json(controller.createMovie(req.body)));
router.post('/delete/:id', (req, res) => res.json(controller.deleteMovie(req.params.id)));
router.put('/update/:id', (req, res) => res.json(controller.updateMovie(req.params.id)));
router.put('/add/likes/:id', (req, res) => res.json(controller.addLikes(req.params.id)));
router.put('/delete/likes/:id', (req, res) => res.json(controller.removeLikes(req.params.id)));

module.exports = router;