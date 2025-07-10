const db = require('../config/db');

exports.getDoctors = (req, res) => {
    const { id, role } = req.user; 
    if (role != 'patient') {
        return res.status(403).json({ error: "Access denied. Only patients can view their appointments." });
    }
    const sql = `
    SELECT users.id, users.name, users.email, 
           doctors.experience, doctors.specialization, doctors.contact 
    FROM users 
    INNER JOIN doctors ON users.id = doctors.user_id 
    WHERE users.role = 'doctor'
`;

    db.query(sql,[id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ doctors: results });
    });
};
