const express = require('express');
const {getDoctors} = require('../controllers/getdoctorController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getDoctors ); 

module.exports = router;
