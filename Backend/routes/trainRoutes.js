const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Assuming verifyToken middleware is necessary for this route
router.get('/availability', trainController.getTrainAvailability);

// module.exports = router;

router.post('/create',  verifyToken, trainController.createTrain);
router.put('/update', verifyToken, trainController.updateTrain);

module.exports = router;


