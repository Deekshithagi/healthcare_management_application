const db = require('../config/db');

exports.bookAppointment = (req, res) => {
    const { doctor_id, appointment_date, reason } = req.body;
    const { id, role } = req.user; 

    if (role !== 'patient') {
        return res.status(403).json({ error: "Access denied. Only patients can book appointments." });
    }

    
    db.query('SELECT user_id FROM doctors WHERE user_id = ?', [doctor_id], (err, doctorResult) => {
        if (err) return res.status(500).json({ error: err.message });
        if (doctorResult.length === 0) return res.status(404).json({ error: "Doctor not found." });

       
        db.query(
            'INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason, status) VALUES (?, ?, ?, ?, ?)', 
            [id, doctor_id, appointment_date, reason, 'pending'], 
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Appointment booked successfully' });
            }
        );
    });
};


exports.getPatientAppointments = (req, res) => {
    const { id, role } = req.user; 

    if (role !== 'patient') {
        return res.status(403).json({ error: "Access denied. Only patients can view their appointments." });
    }

    const sql = `SELECT id, doctor_id, appointment_date, reason, status FROM appointments WHERE patient_id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};


exports.cancelAppointment = (req, res) => {
    const { appointment_id } = req.params;
    const { id, role } = req.user; 

    if (role !== 'patient') {
        return res.status(403).json({ error: "Access denied. Only patients can cancel appointments." });
    }

    const sql = `DELETE FROM appointments WHERE id = ? AND patient_id = ? AND status = 'pending'`;
    db.query(sql, [appointment_id, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(400).json({ error: "Cannot cancel appointment. It may not exist or is already approved/rejected." });
        }

        res.json({ message: 'Appointment canceled successfully' });
    });
};


exports.getDoctorAppointments = (req, res) => {
    const { id, role } = req.user; 
    if (role !== 'doctor') {
        return res.status(403).json({ error: "Access denied. Only doctors can view appointments." });
    }

    const sql = `SELECT id, patient_id, appointment_date, reason, status FROM appointments WHERE doctor_id = ?`;
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.updateAppointmentStatus = (req, res) => {
    const { appointment_id } = req.params;
    const { status } = req.body;
    const { id, role } = req.user; 

    if (role !== 'doctor') {
        return res.status(403).json({ error: "Access denied. Only doctors can update appointments." });
    }

    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ error: "Invalid status. Use 'approved' or 'rejected'." });
    }

    const sql = `UPDATE appointments SET status = ? WHERE id = ? AND doctor_id = ?`;
    db.query(sql, [status, appointment_id, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Appointment not found or unauthorized." });
        }

        res.json({ message: `Appointment ${status} successfully` });
    });
};
