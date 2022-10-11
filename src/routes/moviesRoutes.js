const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');

router
.get('/movies', moviesController.list)
.get('/movies/new', moviesController.new)
.get('/movies/recommended', moviesController.recommended)
.get('/movies/detail/:id', moviesController.detail)
//Rutas exigidas para la creación del CRUD
.get('/movies/add', moviesController.add)
.post('/movies/create', moviesController.create)
.get('/movies/edit/:id', moviesController.edit)
.post('/movies/update/:id', moviesController.update)
.get('/movies/delete/:id', moviesController.delete)
.post('/movies/delete/:id', moviesController.destroy);


module.exports = router;