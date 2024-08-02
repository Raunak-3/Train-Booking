const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');
// const { verifyToken } = require('../middlewares/authMiddleware');

// Assuming verifyToken middleware is necessary for this route
router.get('/availability', trainController.getTrainAvailability);

// module.exports = router;

router.post('/create',trainController.createTrain);
router.put('/update', trainController.updateTrain);
router.get('/:id', trainController.getTrainById);


module.exports = router;


