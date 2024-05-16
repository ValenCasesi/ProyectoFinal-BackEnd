const express = require('express');
const controller = require('../controllers/Paciente');
const router = express.Router();

router.get('/:id/', controller.getPaciente);
router.get('/', controller.getPacientes);
router.post('/', controller.createPaciente,controller.sendEmail);
router.post('/login', controller.logIn);
router.delete('/:id/', controller.deletePaciente);
router.put('/:id/', controller.updatePaciente);
router.get('/email/:id/', controller.sendEmail);
module.exports = router;