const express = require('express');
const DriverAvailable = express.Router();

    DriverAvailable.get('/api/AvailableDrivers', (req, res) => {
        const { date } = req.query;
      
        const query = `SELECT a.DriverId, d.d_name AS driverName
          FROM attendance a
          JOIN driver_details d ON a.DriverId = d.empno
          WHERE DATE(a.arrivaldate) = ?`;
  
    connection.query(query, [date], (error, results) => {
      if (error) {
        console.error('Error fetching available drivers:', error);
        res.status(500).json({ error: 'An error occurred' });
      } else {
        res.json(results);
      }
    });
  });
  

  module.exports = DriverAvailable;
  