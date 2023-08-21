const express = require('express');
const AddAccident = express.Router();  

module.exports = (db) => {
  AddAccident.post('/api/AddAccidentrouter', (req, res) => {
    const {
        vehino,
        accdate,
        acctime,
        accspot,
        driname,
        insuranceclaim,
        accdetails,
    } = req.body;

    console.log(req.body);

    const sql ='INSERT INTO driver_details (vehino, acc_date, acc_time, venue, driver_name, insurance_claim, Other_details)  VALUES (?, ?, ?, ?, ?, ?, ?)';

    // Execute the SQL query with the provided data
    db.query(
      sql,
      [
        vehino,
        accdate,
        acctime,
        accspot,
        driname,
        insuranceclaim,
        accdetails,
    ],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data into database!');
      } else {
        console.log(result);
        res.send('Data inserted into database!');
      }
    }
  );
}
);

return AddAccident;
};