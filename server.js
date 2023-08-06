const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create a MySQL connection pool
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agrotechx',
});

pool.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Middleware to parse JSON body in POST requests
app.use(express.json());

app.post('/api/v1/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Insert the new user into the database
  pool.query(
    'INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',
    [firstname, lastname, email, password],
    (err, result) => {
      if (err) {
        console.error('Error during user registration:', err);
        return res.status(500).json({ success: false, error: 'Registration failed. Please try again later.' });
      } else {
        return res.json({ success: true, message: 'Registration successful!' });
      }
    }
  );
});

app.post('/api/v1/login', (req, res) => {
  const { email, password } = req.body;

  // Perform login authentication, check if the user exists in the database
  pool.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, result) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ success: false, error: 'Login failed. Please try again later.' });
      } else {
        if (result.length === 0) {
          return res.status(401).json({ success: false, error: 'Invalid credentials.' });
        } else {
          return res.json({ success: true, message: 'Login successful!' });
        }
      }
    }
  );
});

// Home endpoint
app.get('/api/v1/home', (req, res) => {
  // Retrieve data from the database or perform any other operations for Home
  res.json({ message: 'Welcome to the home page' });
});

// Blog endpoint
app.get('/api/v1/blog', (req, res) => {
  // Retrieve data from the database or perform any other operations for Blog
  res.json({ message: 'This is the blog page' });
});

// Services endpoint
app.get('/api/v1/services', (req, res) => {
  // Retrieve data from the database or perform any other operations for Services
  res.json({ message: 'This is the services page' });
});

// About endpoint
app.get('/api/v1/about', (req, res) => {
  // Retrieve data from the database or perform any other operations for About
  res.json({ message: 'This is the about page' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
