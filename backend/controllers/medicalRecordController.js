const db = require('../config/db');

exports.addMedicalRecord = (req, res) => {
    const { patient_id, doctor_id, diagnosis, prescription } = req.body;

    db.query(
        'INSERT INTO medical_records (patient_id, doctor_id, diagnosis, prescription) VALUES (?, ?, ?, ?)', 
        [patient_id, doctor_id, diagnosis, prescription], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Medical record added successfully' });
        }
    );
};

exports.getMedicalRecords = (req, res) => {
    const { patient_id } = req.params;

    db.query('SELECT * FROM medical_records WHERE patient_id = ?', [patient_id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'No medical records found' });
        res.json(results);
    });
};
