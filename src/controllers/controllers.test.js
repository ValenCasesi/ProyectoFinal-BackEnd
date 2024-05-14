const {profesionalController, obraSocialController} = require("./Index");
const ObraSocial = require('../models/ObraSocial')
const ObraSocial = require('../models/Professional')
const {Professional} = require("../models");
//test de obra social
test('Obra Social Osde 720', async () => {
    let OS = new ObraSocial;
    OS = await obraSocialController.getObraSocial("62dc6b30294deeae93787cef");

    const nombre = OS.nombre;
    expect(nombre).toBe('Osde 720');
});

//test de profesional
test('Professional ', async () => {
    let Prof = new Professional;
    Prof = await profesionalController.getProfessionalByID("65bfaebb42c8662caae191b5");

    const nombre = Prof.nombre;
    expect(nombre).toBe('Alfredo');
});