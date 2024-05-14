const express = require('express');
const controller = require('../controllers/ObraSocial');
const router = express.Router();

router.get('/:id/', controller.getObraSocial);
router.get('/', controller.getObraSociales);
router.post('/', controller.createObraSocial);
router.delete('/:id/', controller.deleteObraSocial);
router.put('/:id/', controller.updateObraSocial);

module.exports = router;