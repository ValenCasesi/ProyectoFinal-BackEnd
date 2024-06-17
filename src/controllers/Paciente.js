const Paciente = require('../models/Paciente');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Console = require("console");
const nodemailer = require('nodemailer');
const validator = require('validator');

const pacienteController = {

    logIn: async (req, res) => {
        Paciente.find({mail: req.body.mail})
            .exec()
            .then(paciente => {
                if (paciente.length < 1) {
                    return res.status(401).json({
                        message: 'Mail no registrado!'
                    });
                }
                bcrypt.compare(req.body.password, paciente[0].password, (err, resp) => {
                    if (err || !resp) {
                        return res.status(401).json({
                            message: 'Contraseña incorrecta!'
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
            const { dni, mail, nombre, apellido, telefono, password, direccion, fecha_nac } = req.body;

             // Validar el correo electrónico usando validator
            if (!validator.isEmail(mail)) {
                return res.status(400).json({
                    message: 'Correo electrónico no es válido'
                });
            }

            // Verificar si la contraseña cumple con los criterios
            // Aquí puedes personalizar las reglas de validación de la contraseña según tus necesidades
            const passwordIsValid = validator.isLength(password, { min: 8 }) && 
                                    validator.isAlphanumeric(password) && 
                                    validator.matches(password, /\d/); // al menos un dígito
            if (!passwordIsValid) {
                return res.status(400).json({
                    message: 'La contraseña debe tener al menos 8 caracteres y contener solo letras y números, incluyendo al menos un dígito'
                });
            }

            // Verificar si el paciente ya existe por dni o mail
            const existingPaciente = await Paciente.findOne({ $or: [{ dni }, { mail }] });
            if (existingPaciente) {
                return res.status(400).json({
                    message: 'El paciente ya está registrado con el mismo DNI o correo electrónico'
                });
            }

            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const newPaciente = new Paciente({
                        dni,
                        nombre,
                        apellido,
                        telefono,
                        mail,
                        password: hash,
                        direccion,
                        fecha_nac,
                        master: "0"
                    });

                    newPaciente.save(async (err, savedPaciente) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        }

                        await pacienteController.sendEmail(req, res, savedPaciente);
                        //return res.status(200).json(savedPaciente);
                        
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
    sendEmail: async (req, res,paciente) => {
        try {
            if (!paciente) {
                return res.status(404).send({ message: 'Paciente not found' });
            }
            const config = {
                host: 'smtp.gmail.com',
                port : 587,
                auth: {
                    user: 'vdevv2024@gmail.com',
                    pass: process.env.EMAIL_KEY
                }
            }
            //const paciente = await Paciente.findById(req.params.id).exec();  

            const contentHTML = `
            <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Bienvenido a nuestra clínica odontológica</title>
                        <style>
                            /* Estilos CSS aquí */
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
                                display: inline-block;
                                font-size: 16px;
                                margin: 4px 2px;
                                cursor: pointer;
                                border-radius: 5px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Bienvenido ${paciente.nombre} ${paciente.apellido} !</h1>
                            <p>Te damos la bienvenida a nuestra clínica odontológica. Estamos encantados de tenerte como paciente.</p>
                            <p>En nuestra clínica, nos comprometemos a proporcionarte la mejor atención y cuidado dental. Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                            <p>¡Esperamos verte pronto en nuestra clínica!</p>
                            <a href="https://www.ejemplodelpagina.com/contacto" class="button">Contactar</a>
                        </div>
                    </body>
                    </html>
                        `;
            
            const mnsj = {
                from: 'vdevv2024@gmail.com',
                to: paciente.mail,
                subject: 'Clinica Odontolica',
                html: contentHTML
            }

            const transport = nodemailer.createTransport(config);
            const info = await transport.sendMail(mnsj);
            console.log(info)
            return res.send({message: "Email enviado correctamente"});
        } catch(error) {
            console.log(error)
            return res.status(500).send({message: 'Error sendig Email'});
        }
    },

}

module.exports = pacienteController;