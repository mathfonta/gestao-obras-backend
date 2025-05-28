const express = require('express');
const router = express.Router();
const obrasController = require('../controllers/obrasController');

router.get('/', obrasController.listarObras);
router.post('/', obrasController.criarObra);
router.get('/:id', obrasController.buscarObraPorId);
router.put('/:id', obrasController.atualizarObra);
router.delete('/:id', obrasController.deletarObra);

module.exports = router;
