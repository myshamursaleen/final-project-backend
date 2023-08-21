const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'transport',
  connectionLimit: 10,
});

// Connect to the MySQL server
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');
});


// Set a secret key for JWT token
const secretKey = '1245';

// User registration route
app.post('/api/register', async (req, res) => {
  console.log(req.body);
  const { user_name, email, password, userType } = req.body;

  try {
    // Check if the user already exists in the database
    const checkQuery = 'SELECT * FROM users WHERE user_name = ? OR email = ?';
    db.query(checkQuery, [user_name, email], async (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Error querying the database:', checkErr);
        return res.status(500).json({ message: 'Server error' });
      }

      if (checkResults.length > 0) {
        const existingUser = checkResults.find(result => result.user_name === user_name);
        const existingEmail = checkResults.find(result => result.email === email);
    
        if (existingUser) {
          return res.status(400).json({ message: 'Username already exists' });
        }
    
        if (existingEmail) {
          return res.status(400).json({ message: 'Email already exists' });
        }
      }
    
      // Add a check for unique email
      const existingEmail = checkResults.find(result => result.email === email);
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already exists' });
      }


      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user data into the database
      const insertQuery = 'INSERT INTO users (user_name, email, password, userType) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [user_name, email, hashedPassword, userType], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error inserting user data:', insertErr);
          return res.status(500).json({ message: 'Server error' });
        }

        console.log('User registered successfully!');
        return res.json({ success: true, message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User login route
app.post('/api/login', async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // Fetch user from the database based on the provided user_name
    const query = 'SELECT * FROM users WHERE user_name = ?';
    db.query(query, [user_name], async (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      if (results.length === 0) {
        // User not found in the database
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];
      // Compare the provided password withb  the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        // Password does not match
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // User authentication successful, generate a JWT token
      const token = jwt.sign({ user_name: user.user_name, userType: user.userType }, 
        secretKey, {
        expiresIn: '1h', // Token will expire in 1 hour
      });

      res.json({ message: 'Login successful!', role: user.userType, token });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//driver search and delete
app.get('/api1/driverSearchRouter/:empno',(req, res) => {
  const empno = req.params.empno;
  const query = 'SELECT * FROM driver_details WHERE empno = ?';

  db.query(query, [empno], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(results);
  });
});


//driver delete router
app.delete('/api1/driverDeleteRouter/:empno', (req, res) => {
  const empno = req.params.empno;
  const query = 'DELETE FROM driver_details WHERE empno = ?';

  db.query(query, [empno], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the driver with the provided employee number was not found
      return res.status(404).json({ message: 'Driver not found!' });
    }

    res.json({ message: 'Driver deleted successfully!' });
  });
});

//accident search and delete
app.get('/api1/accidentSearchRouter',(req, res) => {
  const vehino = req.params.vehino;
  const query = 'SELECT * FROM accident WHERE vehino = ?';

  db.query(query, [vehino], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(results);
  });
});

app.delete('/api1/AccidentDeleteRouter', (req, res) => {
  const vehino = req.params.vehino;
  const query = 'DELETE FROM accident WHERE vehino = ?';

  db.query(query, [vehino], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the vehicle with the provided employee number was not found
      return res.status(404).json({ message: 'Accident details are not found!' });
    }

    res.json({ message: 'Accident deleted successfully!' });
  });
});

//vehicle delete and search
app.get('/api1/vehicleSearchRouter/:vehino',(req, res) => {
  const vehicleno = req.params.vehino;
  const query = 'SELECT * FROM vehicle WHERE v_no = ?';

  db.query(query, [vehicleno], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    res.json(results);
  });
});


app.delete('/api1/vehicleDeleteRouter/:vehino', (req, res) => {
  const vehicleno = req.params.vehino;
  const query = 'DELETE FROM vehicle WHERE v_no = ?';

  db.query(query, [vehicleno], (err, result) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.affectedRows === 0) {
      // If no rows were affected, it means the vehicle with the provided employee number was not found
      return res.status(404).json({ message: 'vehicle not found!' });
    }

    res.json({ message: 'vehicle deleted successfully!' });
  });
});



//driver add router
const driverRouter = require('./Router/DriverAdd')(db);
app.use(driverRouter);

//vehicle add router
const vehicleRouter = require('./Router/VehicleRouter')(db);
app.use(vehicleRouter);

//logout router
const logoutRouter = require('./Router/logout'); 
app.use(logoutRouter);

//verify the user registration with driver table
const verifyDriverRouter = require('./Router/DriverVerify')(db); // Pass the db instance to the verifyDriverRouter
app.use(verifyDriverRouter);

//Add Accident
const AddAccident = require('./Router/AddAccident')(db);
app.use(AddAccident);

//Leave
const LeaveRouter = require('./Router/Leave')(db);
app.use(LeaveRouter);

//Arrival 
const attendanceRouter = require('./Router/Arrival')(db);
app.use(attendanceRouter);

//Departure
const DepartureRouter = require('./Router/Departure')(db);
app.use(DepartureRouter);

//fetch driver name
const driverNameRouter = require('./Router/ArrivalDriver')(db);
app.use(driverNameRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});