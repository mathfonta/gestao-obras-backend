const express = require('express');
const router = express.Router();
const pagamentosController = require('../controllers/pagamentosController');

router.post('/', pagamentosController.criarPagamento);
router.get('/', pagamentosController.listarPagamentos);
//router.get('/:id', pagamentosController.detalharPagamento);  //opiciinal

module.exports = router;
