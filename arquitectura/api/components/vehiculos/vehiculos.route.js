const express = require('express'),
      router = express.Router(),
      cars = require('./vehiculos.api');

/**
 * 
 */
router.param('id', (req, res, next, id) => {
  req.body.id = id;
  next();
});

/**
 * Función que se encarga de registrar los usuarios dentro del local storage
 */
router.route('/save_car')
  .post((req, res) => {
    cars.registrar(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_cars')
  .get((req, res) => {
    cars.listarTodos(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/update_cars')
  .put((req, res) => {
    cars.actualizar(req,res);
});

module.exports = router;