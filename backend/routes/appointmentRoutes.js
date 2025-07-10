const express = require('express');
const { bookAppointment,getDoctorAppointments ,getPatientAppointments, cancelAppointment ,updateAppointmentStatus} = require('../controllers/appointmentController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, bookAppointment); 
router.get('/patient', verifyToken, getPatientAppointments); 
router.delete('/:appointment_id', verifyToken, cancelAppointment); 
router.get('/doctor', verifyToken, getDoctorAppointments); 
router.put('/:appointment_id', verifyToken, updateAppointmentStatus); 

module.exports = router;
