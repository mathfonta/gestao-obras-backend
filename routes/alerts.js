const express = require('express');
const router = express.Router();
const alertsController = require('../controllers/alertsController');

router.get('/', alertsController.getAlertas);
router.post('/', alertsController.createAlerta);

module.exports = router;
