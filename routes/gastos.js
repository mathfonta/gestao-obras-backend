const express = require('express');
const router = express.Router();
const gastosController = require('../controllers/gastosController');

router.get('/', gastosController.getAllGastos);
router.post('/', gastosController.createGasto);
router.get('/:id', gastosController.getGastoById);
router.put('/:id', gastosController.updateGasto);
router.delete('/:id', gastosController.deleteGasto);

module.exports = router;