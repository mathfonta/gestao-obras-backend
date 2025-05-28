const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');

router.get('/financeiro', reportsController.getRelatorioFinanceiro);

module.exports = router;
