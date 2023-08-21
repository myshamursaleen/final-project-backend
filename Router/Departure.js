
const express = require('express');
const DepartureRouter = express.Router();


module.exports = (db) => {
// POST endpoint to handle form submission
DepartureRouter.post('/api/Departure', (req, res) => {
  const {
    driverId, departureDate, departureTime,
  } = req.body;

  const sql ='INSERT INTO departure ("idDriver","Departuredate","Departuretime") VALUES (?, ?, ?)';  
    db.query(
        sql,
        [
          driverId, departureDate, departureTime, 
],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data into database!');
      } else {
        console.log(result);
        res.send ('Data inserted into database!');
      }
    }
  );
});

return DepartureRouter;

};
