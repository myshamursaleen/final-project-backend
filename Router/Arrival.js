const express = require('express');
const attendanceRouter = express.Router();

module.exports = (db) => {
attendanceRouter.post('/api/Arrival', (req, res) => {
  const { driverId, arrivalDate, arrivalTime } = req.body;

  const query = `INSERT INTO attendance (DriverId, arrivaldate, arrivaltime) VALUES (?, ?, ?)`;

  connection.query(query, [driverId, arrivalDate, arrivalTime], (error, results) => {
    if (error) {
      console.error('Error inserting attendance data:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.json({ message: 'Attendance data inserted successfully' });
    }
  });
});
return attendanceRouter;

};
