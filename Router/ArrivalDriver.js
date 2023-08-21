const express = require('express');
const driverNameRouter = express.Router();

module.exports = (db) => {
driverNameRouter.get('/api1/driverName/:empno', (req, res) => {
  const empno = req.params.empno;

  const query = `SELECT d_name FROM driver_details WHERE empno = ?`;

  connection.query(query, [empno], (error, results) => {
    if (error) {
      console.error('Error fetching driver name:', error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (results.length > 0) {
        const driverName = results[0].d_name;
        res.json({ driverName });
      } else {
        res.status(404).json({ error: 'Driver not found' });
      }
    }
  });
});

return driverNameRouter;
};