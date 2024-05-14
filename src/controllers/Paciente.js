const Paciente = require('../models/Paciente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Console = require("console");


const pacienteController = {

    logIn: async (req, res) => {
        Paciente.find({mail: req.body.mail})
            .exec()
            .then(paciente => {
                if (paciente.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed <1'
                    });
                }
                bcrypt.compare(req.body.password, paciente[0].password, (err, resp) => {
                    if (err || !resp) {
                        return res.status(401).json({
                            message: 'Auth failed password'
                        });
                    }


                    const token = jwt.sign({
                            mail: paciente[0].mail,
                            userId: paciente[0]._id,
                            master: paciente[0].master,
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });


                    return res.status(200).json({
                        message: 'Auth succesful',
                        master: paciente[0].master,
                        userId: paciente[0]._id,
                        token: token
                    });

                });

            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });
    },
    createPaciente: async (req, res) => {
        try {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const newPaciente = new Paciente({
                        dni: req.body.dni,
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        telefono: req.body.telefono,
                        mail: req.body.mail,
                        password: hash,
                        direccion: req.body.direccion,
                        fecha_nac: req.body.fecha_nac,
                        master: "0"
                    });

                    newPaciente.save((err, savedPaciente) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        }
                        return res.status(200).json(savedPaciente);
                    });
                }
            });
        } catch (error) {
            return res.status(500).send({success: false, message: 'Error creating Paciente'});
        }
    },
    getPacientes: async (req, res) => {
        try {
            const pacientes = await Paciente.find({}).exec();
            return res.status(200).json(pacientes)
        } catch (error) {
            return res
                .status(500)
                .send({success: false, message: 'Error finding Paciente'});
        }
    },
    getPaciente: async (req, res) => {
        try {
            const paciente = await Paciente.findById(req.params.id).exec();

            if (!paciente) return res.status(404).send({message: `There is no paciente with ID: ${req.params.id}`});

            return res.send(paciente);
        } catch {
            return res.status(500).send({message: 'Error finding Paciente'});
        }
    },
    deletePaciente: async (req, res) => {
        try {
            const removedPaciente = await Paciente.findByIdAndRemove(req.params.id).exec();

            if (!removedPaciente) return res.status(404).send({message: `There is no Paciente with ID: ${req.params.id}`});

            return res.send({message: "Paciente deleted successfully"});
        } catch {
            return res.status(500).send({message: 'Error deleting Paciente'});
        }
    },
    updatePaciente: async (req, res) => {
        try {
            const updatedPaciente = await Paciente.findByIdAndUpdate(req.params.id, {
                dni: req.body.dni,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono,
                mail: req.body.mail,
                direccion: req.body.direccion,
                fecha_nac: req.body.fecha_nac
            }).exec();

            if (!updatedPaciente) return res.status(404).send({message: `There is no Paciente with ID: ${req.params.id}`});

            return res.send({message: "Paciente updated successfully"});
        } catch {
            return res.status(500).send({message: 'Error updating Paciente'});
        }
    },


}

module.exports = pacienteController;