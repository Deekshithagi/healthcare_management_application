const express = require('express');
const { getDoctors, getDoctorById, addDoctor } = require('../controllers/doctorController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getDoctors);
router.get('/:id', verifyToken, getDoctorById);
router.post('/', verifyToken, addDoctor);

module.exports = router;
