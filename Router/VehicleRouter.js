const express = require('express');
const vehicleRouter = express.Router();

module.exports = (db) => {
// POST endpoint to handle form submission
vehicleRouter.post('/api1/addvehicle', (req, res) => {
  const {
vehicleno,
vehitype,
vehiclass,
oiltype,
insuranceno,
insexpmonth,
inscom, 
Enginno, 
manuyear, 
fregisterdate,
tyresize, 
battsize,
vlicenseno,
liceexpdate, 
votherdetails,
  } = req.body;

  const sql ='INSERT INTO vehicle (v_no, v_type, v_class, oil_type, Insurance_no, Ins_exp_date, ins_company, engine_no, manufacture_year,  Fst_reg_date, tyre_size, battery_size, license_no, licence_exp_date, other_details) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';  
    db.query(
        sql,
        [
            vehicleno,
            vehitype,
            vehiclass,
            oiltype,
            insuranceno,
            insexpmonth,
            inscom, 
            Enginno, 
            manuyear, 
            fregisterdate,
            tyresize, 
            battsize,
            vlicenseno,
            liceexpdate, 
            votherdetails,  
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

return vehicleRouter;

};
