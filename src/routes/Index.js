const express = require('express');
const obraSocial = require('./obraSocial');
const paciente = require('./Paciente');
const profesional = require('./Professional');
const schedule = require('./Schedule');
const turno = require('./Turno');
const practica = require('./Practice');


const router = express.Router();

router.use('/ObraSocial', obraSocial);
router.use('/Paciente', paciente);
router.use('/Professional', profesional);
router.use('/Practica', practica);
router.use('/Schedule', schedule);
router.use('/Turno', turno);


module.exports = router;