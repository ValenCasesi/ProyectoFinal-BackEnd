const Professional = require('../models/Professional');
const ObraSocial = require('../models/ObraSocial')
const {turnoController, obraSocialController} = require("./Index");
const {Turno} = require("../models");
const {Schedule} = require("../models");
const moment = require("moment");
const Turn = require("../models/Turn")

const professionalController = {
    getProfessional: async (req, res) => {
        try {
            const professional = await Professional.find({}).exec();
            return res
                .status(200)
                .json(professional)
        } catch (err) {
            return res
                .status(500)
                .send({success: false, postMessage: 'Error finding Professionals'});
        }
    },

    getProfessionalByID: async (req, res) => {
        try {
            const professional = await Professional.findById(req.params.id).exec();
            if (!professional) return res.status(404).send({message: `there is no prof with ID: ${req.params.id}`});
            return res
                .status(200)
                .json(professional);

        } catch {
            return res.status(500).send({message: 'Error finding Professional'});

        }
    },

    createProfessional: async (req, res) => {
        try {
            const newProfessional = new Professional({
                dni: req.body.dni,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                mail: req.body.mail,
                direccion: req.body.direccion,
                fecha_nac: req.body.fecha_nac,
                schedules: req.body.schedules,
                obrasSociales: req.body.obrasSociales,
                practicas: req.body.practicas
            });
            await newProfessional.save();
            return res.status(200).send({success: true, newProfessional});
        } catch {
            return res.status(500).send({message: 'Error creating a Professional'})
        }
    },

    deleteProfessional: async (req, res) => {
        try {
            const removedProfessional = await Professional.findByIdAndRemove(req.params.id).exec();
            if (!removedProfessional) return res.status(404).send({message: 'There is no Professional with ID: ${req.params.id}'});
            return res.send({message: 'Professional deleted successfully'})
        } catch {
            return res.status(500).send({message: 'Error deleting Professional'})
        }
    },

    updateProfessional: async (req, res) => {
        try {
            const updatedProfessional = await Professional.findByIdAndUpdate(
                req.params.id, {
                    dni: req.body.dni,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    telefono: req.body.telefono,
                    mail: req.body.mail,
                    direccion: req.body.direccion,
                    fecha_nac: req.body.fecha_nac,
                    schedule: req.body.schedule,
                    obrasSociales: req.body.obrasSociales,
                    practicas: req.body.practicas
                }
            ).exec();

            if (!updatedProfessional) return res.status(404).send({message: `There is no Professional with Id: ${req.params.id} `});

            return res.send({message: "Professional updated successfully"});
        } catch {
            return res.status(503).send({message: 'error updating Professional'})
        }
    },

    addSchedule: async (req, res) => {
        const professionalId = req.params.id;
        const professional = await Professional.findById(professionalId);
        if (!professional) {
            return res.status(404).send({message: 'Professional not found'});
        }
        if (professional.schedules.indexOf(req.body.scheduleId) === -1) {
            professional.schedules.push(req.body.scheduleId);
        }
        const updatedProfessional = await Professional.findByIdAndUpdate(professionalId, professional, {
            new: true,
        });
        if (!updatedProfessional) {
            return res.status(500).send({message: 'Error trying to add Schedule'});
        }
        return res.send({message: 'Professional updated successfully'});
    },

    removeSchedule: async (req, res) => {
        const professionalId = req.params.id;
        const professional = await Professional.findById(professionalId);
        if (!professional) {
            return res.status(404).send({message: 'Profesional not found'});
        }
        const {scheduleId} = req.body;
        const index = professional.schedules.indexOf(scheduleId);
        if (index === -1) {
            return res.status(404).send({message: 'Schedule not found'});
        }
        professional.schedules.splice(index, 1);
        const updateProfessional = await Professional.findByIdAndUpdate(professionalId, professional, {
            new: true,
        });
        if (!updateProfessional) {
            return res.status(500).send({message: 'Error trying to remove Schedule'});
        }
        return res.send({message: 'Professional updated successfully'});
    },

    addOS: async (req, res) => {
        const professionalId = req.params.id;
        const professional = await Professional.findById(professionalId);
        if (!professional) {
            return res.status(404).send({message: 'Professional not found'});
        }
        if (professional.obrasSociales.indexOf(req.params.idOS) === -1) {
            professional.obrasSociales.push(req.params.idOS);
        }
        const updatedProfessional = await Professional.findByIdAndUpdate(professionalId, professional, {
            new: true,
        });
        if (!updatedProfessional) {
            return res.status(500).send({message: 'Error trying to add OS'});
        }
        return res.send({message: 'Professional updated successfully'});
    },

    removeOS: async (req, res) => {
        const professionalId = req.params.id;
        const professional = await Professional.findById(professionalId);
        if (!professional) {
            return res.status(404).send({message: 'Profesional not found'});
        }
        const obraSocialId = req.params.idOS; // Corregir esta línea
        const index = professional.obrasSociales.indexOf(obraSocialId);
        if (index === -1) {
            return res.status(404).send({message: 'Schedule not found'});
        }
        professional.obrasSociales.splice(index, 1);
        const updateProfessional = await Professional.findByIdAndUpdate(professionalId, professional, {
            new: true,
        });
        if (!updateProfessional) {
            return res.status(500).send({message: 'Error trying to remove OS'});
        }
        return res.send({message: 'Professional updated successfully'});
    },

    addPractice: async (req, res) => {
        const professionalId = req.params.id;
        const professional = await Professional.findById(professionalId);
        if (!professional) {
            return res.status(404).send({message: 'Professional not found'});
        }
        if (professional.practicas.indexOf(req.params.idPractice) === -1) {
            professional.practicas.push(req.params.idPractice);
        }
        const updatedProfessional = await Professional.findByIdAndUpdate(professionalId, professional, {
            new: true,
        });
        if (!updatedProfessional) {
            return res.status(500).send({message: 'Error trying to add the practice'});
        }
        return res.send({message: 'Professional updated successfully'});
    },

    removePractice: async (req, res) => {
        const professionalId = req.params.id;
        const professional = await Professional.findById(professionalId);
        if (!professional) {
            return res.status(404).send({message: 'Profesional not found'});
        }
        const practicaId = req.params.idPractice;
        const index = professional.practicas.indexOf(practicaId);
        if (index === -1) {
            return res.status(404).send({message: 'Practice not found'});
        }
        professional.practicas.splice(index, 1);
        const updateProfessional = await Professional.findByIdAndUpdate(professionalId, professional, {
            new: true,
        });
        if (!updateProfessional) {
            return res.status(500).send({message: 'Error trying to remove practicas'});
        }
        return res.send({message: 'Professional updated successfully'});
    },


    retrieveProfessional: async (req, res) => {
        try {
            const professionalId = req.params.id;
            const date = req.params.fecha;
            const professional = await Professional.findById(professionalId);

            if (!professional) {
                return res.status(404).send({message: 'Professional not found'});
            }

            const dateString = moment(date).format('dddd');
            const schedule = await Professional.findOne({_id: professionalId}).populate('schedules', 'dia');
            const sche = await Schedule.findOne({'_id': schedule.schedules, 'dia': dateString, 'state': true});

            var cont = sche.hsDesde;
            let turns = [];
            while (cont <= (sche.hsHasta - 0.25)) {
                let turn = new Turn();
                turn.hora = cont;
                turn.busy = false;
                turns.push(turn);
                cont = cont + 0.25;
            }

            let turnosByPD = await turnoController.getTurnoByPD(req.params.id, date);

            if (turnosByPD) {
                for (let x of turnosByPD) {
                    for (let t of turns) {
                        if (t.hora === x.hsDesde) {
                            t.busy = true;
                        }
                    }
                }
            }
            if (!turns.length) {
                return res.status(503).send({message: 'No hay turnos para ese profesional ese día'});
            }
            return res.status(200).json(turns);
        } catch (error) {
            console.error(error);
            return res.status(500).send({message: 'Error searching Turnos'});
        }
    },
    retrieveOS: async (req, res) => {
        try {
            const professionalId = req.params.id;
            const professional = await Professional.findById(professionalId);
            if (!professional) {
                return res.status(404).send({message: 'Professional not found'});
            }
            let obrasSociales = [];
            for (let i = 0; i < professional.obrasSociales.length; i++) {
                const osId = professional.obrasSociales[i];
                obrasSociales.push(osId)
            }
            return res.status(200).json(obrasSociales);
        } catch (error) {
            return res.status(500).send({message: 'Error retrieving OS', error: error.message});
        }
    },
    retrievePractice: async (req, res) => {
        try {
            const professionalId = req.params.id;
            const professional = await Professional.findById(professionalId);
            if (!professional) {
                return res.status(404).send({message: 'Professional not found'});
            }
            let practice = [];
            for (let i = 0; i < professional.practicas.length; i++) {
                const practiceId = professional.practicas[i];
                practice.push(practiceId)
            }
            return res.status(200).json(practice);
        } catch (error) {
            return res.status(500).send({message: 'Error retrieving OS', error: error.message});
        }
    }
}

module.exports = professionalController;