const express = require('express');
const LeaveRouter = express.Router();


module.exports = (db) => {
// POST endpoint to handle form submission
LeaveRouter.post('/api1/LeaveSubmit', (req, res) => {
  const {
    employeeno,
    applydate,
    leaveFromDate,
    leaveToDate,
    leaveDays,
    dutyAssumingDate,
  } = req.body;

  const sql ='INSERT INTO leave ("employeeno","date","leaveFrom","leaveTo","noDays","Dutyassumedate") VALUES (?, ?, ?, ?, ?, ?)';  
    db.query(
        sql,
        [
          employeeno,
            applydate,
            leaveFromDate,
            leaveToDate,
            leaveDays,
            dutyAssumingDate,
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

return LeaveRouter;

};
