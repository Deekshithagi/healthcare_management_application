const express = require('express');
const { addMedicalRecord, getMedicalRecords } = require('../controllers/medicalRecordController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, addMedicalRecord);
router.get('/:patient_id', verifyToken, getMedicalRecords);

module.exports = router;
