const express = require('express');
const { getPatients, getPatientById, addPatient } = require('../controllers/patientController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getPatients);
router.get('/:id', verifyToken, getPatientById);
router.post('/', verifyToken, addPatient );

module.exports = router;
