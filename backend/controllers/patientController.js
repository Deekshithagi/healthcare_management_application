const db = require('../config/db');

exports.getPatients = (req, res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getPatientById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM patients WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Patient not found' });
        res.json(results[0]);
    });
};

exports.addPatient = (req, res) => {
    const { user_id, name, age, gender, contact, address, medical_history } = req.body;

    const sql = `INSERT INTO patients (user_id, name, age, gender, contact, address, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [user_id, name, age, gender, contact, address, medical_history];

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Patient added successfully', patient_id: result.insertId });
    });
};
