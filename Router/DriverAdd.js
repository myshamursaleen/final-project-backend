const express = require('express');
const driverRouter = express.Router();  

module.exports = (db) => {
  driverRouter.post('/api1/driverAddrouter', (req, res) => {
    const {
      empno,
      name,
      fullname,
      nic,
      dob,
      phone,
      address,
      licenseno,
      marritalstate,
      email,
      fappoinmentd,
      currentappdate,
      highereduq,
      otherdetails,
    } = req.body;

    console.log(req.body);

    const sql ='INSERT INTO driver_details (empno, d_name, d_fullName, NIC, DOB, Age, phone, address, License_no, marrital_state, email, FApp_date, AppDate_dep, Ed_Qualification, Other_details)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // Execute the SQL query with the provided data
    db.query(
      sql,
      [
        empno,
        name,
        fullname,
        nic,
        dob,
        phone,
        address,
        licenseno,
        marritalstate,
        email,
        fappoinmentd,
        currentappdate,
        highereduq,
        otherdetails,
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

  return driverRouter;
};