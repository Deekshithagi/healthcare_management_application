const db = require('../config/db');

exports.getDoctors = (req, res) => {
    db.query('SELECT * FROM doctors', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getDoctorById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM doctors WHERE id = ?', [id], (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: 'Doctor not found' });
        res.json(results[0]);
    });
};

exports.addDoctor = (req, res) => {
    const { user_id, specialization, experience, contact } = req.body;

    db.query(
        'INSERT INTO doctors (user_id, specialization, experience, contact) VALUES (?, ?, ?, ?)', 
        [user_id, specialization, experience, contact], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Doctor added successfully' });
        }
    );
};
