const express = require('express'),
      router = express.Router(),
      users = require('./usuarios.api');

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
router.route('/saveUser')
  .post((req, res) => {
    users.save(req,res);
});

/**
 * Función que obtiene todos los usuarios
 */
router.route('/get_all_users')
  .get((req, res) => {
    users.findAll(req,res);
});

/**
 * Función que actualiza los usuarios
 */
router.route('/updateUsers')
  .put((req, res) => {
    users.update(req,res);
});

module.exports = router;