const express = require('express');
const router = express.Router();
let controller = require('./controller');

router.get('/', (req, res) => res.json(controller.getMovies()));
router.get('/:id', (req, res) => res.body(controller.getSingleMovie(req.body)));
router.post('/create', (req, res) => res.body(controller.createMovie(req.params.id)));
router.post('/delete/:id', (req, res) => res.body(controller.deleteMovie(req.params.id)));
router.put('/update/:id', (req, res) => res.body(controller.updateMovie(req.params.id)));
router.put('/add/likes/:id', (req, res) => res.body(controller.addLikes(req.params.id)));
router.put('/delete/likes/:id', (req, res) => res.body(controller.removeLikes(req.params.id)));

module.exports = router;