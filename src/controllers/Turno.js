const Turno = require('../models/Turno');
const Professional = require('../models/Professional');
const Paciente = require('../models/Paciente');
const nodemailer = require('nodemailer');
const moment = require("moment");

const turnoController = {

    getTurno: async (req, res) => {
        try {
            const turnos = await Turno.find({}).exec();
            return res.status(200).json(turnos);
        } catch (err) {
            return res.status(503).send({success: false, postMessage: 'Error finding Turnos'});
        }
    },

    getTurnoByID: async (req, res) => {
        try {
            const turno = await Turno.findById(req.params.id).exec();
            if (!turno) return res.status(404).send({message: `there is no turno with ID: ${req.params.id}`});
            return res.send(turno);

        } catch {
            return res.status(500).send({message: 'Error finding Turno'});

        }
    },
    createTurno: async (req, res) => {
        try {
            // Extraer datos del cuerpo de la solicitud
            const { dia, paciente } = req.body;

            // Contar el número de turnos para el paciente en el día dado
            const existingTurnosCount = await Turno.countDocuments({ dia, paciente });
           

            // Verificar si el conteo es 2 o más
            if (existingTurnosCount >= 2) {
                return res.status(400).send({ message: 'El paciente no puede tener más de 2 turnos en el mismo día' });
            }

            const newTurno = new Turno({
                dia: req.body.dia,
                paciente: req.body.paciente,
                obraSocial: req.body.obraSocial,
                professional: req.body.professional,
                practica: req.body.practica,
                hsDesde: req.body.hsDesde,
            });

            await newTurno.save();
            await turnoController.sendEmailTurno(req, res, newTurno);
            //return res.status(200).send({success: true, newTurno});
        } catch (err) {
            return res.status(503).send({message: err})
        }
    },
    deleteTurno: async (req, res) => {
        try {
            const removedTurno = await Turno.findByIdAndRemove(req.params.id).exec();
            if (!removedTurno) return res.status(404).send({message: 'There is no Turno with ID: ${req.params.id}'});
            return res.send({message: 'Turno deleted successfully'})
        } catch {
            return res.status(500).send({message: 'Error deleting Turno'})
        }
    },

    updateTurno : async (req, res) => {
        try {
            const updatedTurno = await Turno.findByIdAndUpdate(
                req.params.id,
                {
                    costo: req.body.costo,
                    pagado: req.body.pagado,
                    observacion: req.body.observacion
                },
                {
                    new: true, // Devuelve el documento actualizado
                    runValidators: true // Ejecuta las validaciones del schema
                }
            ).exec();
    
            if (!updatedTurno) {
                return res.status(404).send({ message: `There is no Turno with Id: ${req.params.id}` });
            }
    
            return res.send({ message: "Turno updated successfully", turno: updatedTurno });
        } catch (error) {
            console.error('Error updating Turno:', error.message);
            return res.status(503).send({ message: 'Error updating Turno' });
        }
    },

    async getTurnoByPD(idProf, date) {
        try {
            const turnos = await Turno.find({professional: idProf}, {
                "dia": 1,
                "hsDesde": 1,
                "_id": 1
            }).find({dia: date});
            console.log(`hsDesde: ${JSON.stringify(turnos[0].hsDesde)}`);
            return (turnos);
        } catch (err) {
            //return res.status(503).send({message: 'Error retrieving turnos by professional and date'})
        }
    },
    getTurnosByProfessional: async (req, res) => {
        try {
            const professionalId = req.params.id;
            const turnos = await Turno.find({ professional: professionalId })
                .sort({ dia: -1 }) // Ordenar por fecha (campo 'dia') en orden descendente
                .exec();
            if (!turnos.length) {
                return res.status(404).send({ message: `No hay turnos para el profesional con ID: ${professionalId}` });
            }
            return res.status(200).json(turnos);
        } catch (err) {
            return res.status(503).send({ success: false, message: 'Error al buscar turnos por profesional' });
        }
    },
    
    getTurnosByPaciente: async (req, res) => {
        try {
            const pacienteId = req.params.id;
            const turnos = await Turno.find({ paciente: pacienteId }).exec();
            if (!turnos.length) return res.status(404).send({ message: `No hay turnos para el paciente con ID: ${pacienteId}` });
            return res.status(200).json(turnos);
        } catch (err) {
            return res.status(503).send({ success: false, message: 'Error al buscar turnos por paciente' });
        }
    },
    sendEmailTurno: async (req, res, turno) => {
        try {
            if (!turno) {
                return res.status(404).send({ message: 'Turno not found' });
            }
            const config = {
                host: 'smtp.gmail.com',
                port: 587,
                auth: {
                    user: 'vdevv2024@gmail.com',
                    pass: process.env.EMAIL_KEY
                }
            };
    
            const paciente = await Paciente.findById(turno.paciente).exec();
            const profesional = await Professional.findById(turno.professional).exec();
            
            const fecha = moment(turno.dia);
            const turnoFecha = fecha.format('DD/MM/YYYY');
            
            if (!paciente || !profesional) {
                return res.status(404).send({ message: 'Paciente or Profesional not found' });
            }
    
            const contentHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmación de Turno - Clínica Odontológica</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f3f3f3;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333333;
                    }
                    p {
                        color: #666666;
                    }
                    .button {
                        display: inline-block;
                        background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 10px 20px;
                        text-align: center;
                        text-decoration: none;
                        font-size: 16px;
                        margin: 4px 2px;
                        cursor: pointer;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Turno Registrado Correctamente, ${paciente.nombre} ${paciente.apellido}!</h1>
                    <p>Nos complace informarte que tu turno ha sido registrado con éxito.</p>
                    <p><strong>Profesional:</strong> ${profesional.nombre} ${profesional.apellido}</p>
                    <p><strong>Fecha y Hora:</strong> ${turnoFecha} a las ${turno.hsDesde}hs</p>
                    <p>Si tienes alguna pregunta o necesitas modificar tu turno, no dudes en contactarnos.</p>
                    <p>¡Esperamos verte pronto en nuestra clínica!</p>
                    <a href="https://www.ejemplodelpagina.com/contacto" class="button">Contactar</a>
                </div>
            </body>
            </html>
            `;
    
            const mnsj = {
                from: 'vdevv2024@gmail.com',
                to: paciente.mail,
                subject: 'Clinica Odontologica',
                html: contentHTML
            };
    
            const transport = nodemailer.createTransport(config);
            const info = await transport.sendMail(mnsj);
            console.log(info);
            return res.send({ message: "Email enviado correctamente" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error envio de Email' });
        }
    },

}
module.exports = turnoController;
