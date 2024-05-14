const ObraSocial = require('../models/ObraSocial');

const obraSocialController = {
    createObraSocial: async (req, res) => {
        try {
            const newObraSocial = new ObraSocial({
                nombre: req.body.nombre,
                imgURL: req.body.imgURL
            });
            await newObraSocial.save();
            return res.status(200).send({success: true, newObraSocial});
        } catch (error) {
            return res
                .status(500)
                .send({success: false, message: error})
        }
    },

    getObraSociales: async (req, res) => {
        try {
            const obrasSociales = await ObraSocial.find({}).exec();
            return res.status(200).json(obrasSociales)
        } catch (error) {
            return res
                .status(500)
                .send({success: false, message: 'Error finding obra social'});
        }
    },
    getObraSocial: async (req, res) => {
        try {
            const obraSocial = await ObraSocial.findById(req.params.id).exec();

            if (!obraSocial) return res.status(404).send({message: `There is no obra Social with ID: ${req.params.id}`});

            return res.send(obraSocial);
        } catch {
            return res.status(500).send({message: 'Error finding Obra Social'});
        }
    },
    deleteObraSocial: async (req, res) => {
        try {
            const removedObraSocial = await ObraSocial.findByIdAndRemove(req.params.id).exec();

            if (!removedObraSocial) return res.status(404).send({message: `There is no Obra Social with ID: ${req.params.id}`});

            return res.send({message: "Obra Social deleted successfully"});
        } catch {
            return res.status(500).send({message: 'Error deleting Obra Social'});
        }
    },
    updateObraSocial: async (req, res) => {
        try {
            const updatedObraSocial = await ObraSocial.findByIdAndUpdate(req.params.id, {
                nombre: req.body.nombre,
                imgURL: req.body.imgURL
            }).exec();

            if (!updatedObraSocial) return res.status(404).send({message: `There is no obraSocial with ID: ${req.params.id}`});

            return res.send({message: "Obra Social updated successfully"});
        } catch {
            return res.status(500).send({message: 'Error updating Obra Social'});
        }
    },


}

module.exports = obraSocialController;