const express = require('express');
const controller = require('../controllers/Schedule')

const router = express.Router();

router.get('/', controller.getSchedule);
router.get('/:id/', controller.getScheduleByID);
router.post('/', controller.createSchedule);
router.delete('/:id/', controller.deleteSchedule);
router.put('/:id/', controller.updateSchedule);

module.exports = router;