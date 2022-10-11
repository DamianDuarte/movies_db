const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

router
.get('/actors', actorsController.list)
.get('/actors/detail/:id', actorsController.detail)
//Rutas exigidas para la creación del CRUD
.get('/actors/add', actorsController.add)
.post('/actors/create', actorsController.create)
.get('/actors/edit/:id', actorsController.edit)
.post('/actors/update/:id', actorsController.update)
.get('/actors/delete/:id', actorsController.delete)
.post('/actors/delete/:id', actorsController.destroy);

module.exports = router;