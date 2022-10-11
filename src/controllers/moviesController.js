const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const {Movies,Genres,Actor} = require('../database/models')

module.exports = 
{
    list: (req, res) => 
    {
        db.Movie.findAll()
            .then((movies) =>
            {
                return res.render('moviesList', {movies})
            })
            .catch(err => console.log(err));
    },
    new: (req, res) => 
    {
        const operationQuery =
        {
            order: [['release_date', 'DESC']]
        };

        db.Movie.findAll(operationQuery)
            .then(movies => res.render('moviesList', {movies}))
            .catch(err => console.log(err));
    },
    recommended: (req, res) => 
    {
        const operationQuery =
        {
            order: [['release_date', 'DESC']],
            limit: 5
        }

        db.Movie.findAll(operationQuery)
            .then(movies => res.render('moviesList', {movies}))
            .catch(err => console.log(err));
    },
    detail: (req, res) => 
    {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDetail', {movie}))
            .catch(err => console.log(err));
    },

    /* METODOS CRUD */
    add:  (req, res) => {
        db.Genre.findAll()
            .then((allGenres) => {
                return res.render('moviesAdd', {allGenres})
            })
            .catch(err => console.log(err));
    },
    create:  (req,res) => {
        db.Movie.create({
           ...req.body,
           title: req.body.title,
        })
        .then( newMovie => {
            res.redirect('/movies/detail/' + newMovie.id)
        })
        .catch(err => console.log(err))
    },
    edit: (req,res) => {
        let movie = db.Movie.findByPk(req.params.id);
        let allGenres = db.Genre.findAll({order:['name']});

        Promise.all([movie, allGenres])
            .then(([movie, allGenres]) => res.render('moviesEdit', {movie, allGenres, moment}))
            .catch(err => console.log(err))
    },
    update:  (req,res) => {
        db.Movie.update(
            {
                ...req.body
            },
            {
                where:
                {
                    id: req.params.id
                }
            })
                .then(() => res.redirect('/movies/detail/' + req.params.id))
                .catch(err => console.log(err));    
            },
    delete:  (req,res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => res.render('moviesDelete', {movie}))
            .catch(err => console.log(err))
    },
    destroy:  (req,res) => {
        db.Movie.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch(err => console.log(err))
    }
}