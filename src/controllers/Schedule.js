const Schedule = require('../models/Schedule');

const scheduleController = {
    getSchedule: async (req, res) => {
        try {
            const schedules = await Schedule.find({}).exec();
            return res.status(200).json(schedules)
        } catch (err) {
            return res.status(500).send({success: false, postMessage: 'Error finding Schedule'});
        }
    },

    getScheduleByID: async (req, res) => {
        try {
            const schedule = await Schedule.findById(req.params.id).exec();
            if (!schedule) return res.status(404).send({message: `there is no Schedule with ID: ${req.params.id}`});
            return res.send(schedule);

        } catch {
            return res.status(500).send({message: 'Error finding Schedule'});

        }
    },

    createSchedule: async (req, res) => {
        try {
            const newSchedule = new Schedule({
                dia: req.body.dia,
                hsDesde: req.body.hsDesde,
                hsHasta: req.body.hsHasta,
                state: true,
            });
            await newSchedule.save();
            return res.status(200).send({success: true, newSchedule});
        } catch {
            return res.status(500).send({message: 'Error creating a Schedule'})
        }
    },

    deleteSchedule: async (req, res) => {
        try {
            const removedSchedule = await Schedule.findByIdAndRemove(req.params.id).exec();
            if (!removedSchedule) return res.status(404).send({message: 'There is no Schedule with ID: ${req.params.id}'});
            return res.send({message: 'Schedule deleted successfully'})
        } catch {
            return res.status(500).send({message: 'Error deleting Schedule'})
        }
    },

    updateSchedule: async (req, res) => {
        try {
            const updatedSchedule = await Schedule.findByIdAndUpdate(
                req.params.id, {
                    hsDesde: req.body.hsDesde,
                    hsHasta: req.body.hsHasta,
                    state: req.body.state
                }
            ).exec();

            if (!updatedSchedule) return res.status(404).send({message: `There is no Schedule with Id: ${req.params.id} `});
            return res.send({message: "Schedule updated successfully"});
        } catch {
            return res.status(500).send({message: 'error updating Schedule'})
        }
    },
}

module.exports = scheduleController;