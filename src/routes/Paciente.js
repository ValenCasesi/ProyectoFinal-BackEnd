const express = require('express');
const controller = require('../controllers/Paciente');
const router = express.Router();

router.get('/:id/', controller.getPaciente);
router.get('/', controller.getPacientes);
router.post('/', controller.createPaciente);
router.post('/login', controller.logIn);
router.delete('/:id/', controller.deletePaciente);
router.put('/:id/', controller.updatePaciente);

module.exports = router;