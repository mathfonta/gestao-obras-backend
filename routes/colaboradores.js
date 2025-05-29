const express = require('express');
const router = express.Router();
const controller = require('../controllers/colaboradoresController');

router.get('/', controller.listarColaboradores);
router.post('/', controller.criarColaborador);

module.exports = router;
