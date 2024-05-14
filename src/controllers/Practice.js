const Practica = require('../models/Practice');

const practicaController = {
    createPractica: async (req, res) => {
        try {
            const newPractica = new Practica({
                nombre: req.body.nombre,
            });
            await newPractica.save();
            return res.status(200).send({success: true, newPractica});
        } catch {
            return res
                .status(500)
                .send({success: false, message: 'Error creating practica'})
        }
    },

    getPractica: async (req, res) => {
        try {
            const practicas = await Practica.find({}).exec();
            return res.status(200).json(practicas);
        } catch (err) {
            return res
                .status(500)
                .send({success: false, message: 'Error finding Practica'});
        }
    },
    getPracticaById: async (req, res) => {
        try {
            const practica = await Practica.findById(req.params.id).exec();

            if (!practica) return res.status(404).send({message: `There is no practica with ID: ${req.params.id}`});

            return res.send(practica);
        } catch {
            return res.status(500).send({message: 'Error finding Practica'});
        }
    },
    deletePractica: async (req, res) => {
        try {
            const removedPractica = await Practica.findByIdAndRemove(req.params.id).exec();

            if (!removedPractica) return res.status(404).send({message: `There is no Practica with ID: ${req.params.id}`});

            return res.send({message: "Practica deleted successfully"});
        } catch {
            return res.status(500).send({message: 'Error deleting Paciente'});
        }
    },
    updatePractica: async (req, res) => {
        try {
            const updatedPractica = await Practica.findByIdAndUpdate(req.params.id, {
                nombre: req.body.nombre,
            }).exec();

            if (!updatedPractica) return res.status(404).send({message: `There is no Practica with ID: ${req.params.id}`});

            return res.send({message: "Practica updated successfully"});
        } catch {
            return res.status(500).send({message: 'Error updating Practica'});
        }
    },


}

module.exports = practicaController;