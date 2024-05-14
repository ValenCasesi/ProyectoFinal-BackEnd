const express = require('express');
const controller = require('../controllers/Practice');
const router = express.Router();

router.get('/:id/', controller.getPracticaById);
router.get('/', controller.getPractica);
router.post('/', controller.createPractica);
router.delete('/:id/', controller.deletePractica);
router.put('/:id/', controller.updatePractica);

module.exports = router;