const express = require('express');
const controller = require('../controllers/Professional')

const router = express.Router();

router.get('/', controller.getProfessional);
router.get('/:id/', controller.getProfessionalByID);

router.get("/:id/OS", controller.retrieveOS);
router.post('/:id/OS/:idOS', controller.addOS);
router.delete('/:id/OS/:idOS', controller.removeOS);

router.post('/:id/Practice/:idPractice', controller.addPractice);
router.delete('/:id/Practice/:idPractice', controller.removePractice);
router.get("/:id/Practice", controller.retrievePractice);

router.get('/:id/:fecha', controller.retrieveProfessional);

router.post('/', controller.createProfessional);
router.delete('/:id/', controller.deleteProfessional);
router.put('/:id/', controller.updateProfessional);

router.post('/:id/Schedule', controller.addSchedule);
router.delete('/:id/Schedule', controller.removeSchedule);


module.exports = router;