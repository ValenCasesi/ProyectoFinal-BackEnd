const express = require('express');
const controller = require('../controllers/Turno')

const router = express.Router();

router.get('/', controller.getTurno);
router.get('/:id/', controller.getTurnoByID);
router.post('/', controller.createTurno);
router.delete('/:id/', controller.deleteTurno);
router.put('/:id/', controller.updateTurno);

module.exports = router;