const express = require('express');
const verifyDriverRouter = express.Router();

module.exports = (db) => {
  verifyDriverRouter.post('/api/verifyDriverDetails', (req, res) => {
    const { empno, email } = req.body;

    //query to check if empno and email exist in the drivers table
    db.query(
      'SELECT empno, email FROM driver_details WHERE empno = ? AND email = ?',
      [empno, email],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error checking driver details.');
        }

        if (result.length === 0) {
          // If empno and email do not match any driver details, return a response indicating no match
          return res.json({ isMatch: false });
        }

        // If empno and email match a driver's details, return a response indicating a match
        return res.json({ isMatch: true });
      }
    );
  });

  return verifyDriverRouter;
};
