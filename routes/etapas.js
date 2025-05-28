const express = require('express');
const router = express.Router();
const etapasController = require('../controllers/etapasController');

router.get('/', etapasController.listarEtapas);
router.post('/', etapasController.criarEtapa);
router.get('/:id', etapasController.buscarEtapaPorId);
router.put('/:id', etapasController.atualizarEtapa);
router.delete('/:id', etapasController.deletarEtapa);

module.exports = router;
