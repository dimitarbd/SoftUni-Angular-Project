const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { partController } = require('../controllers');

// middleware that is specific to this router

router.get('/', partController.getParts);
router.post('/', auth(), partController.createPart);

router.get('/:partId', partController.getPart);
router.post('/:partId', auth(), partController.createPart);
router.put('/:partId', auth(), partController.updatePart);
router.delete('/:partId', auth(), partController.deletePart);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router