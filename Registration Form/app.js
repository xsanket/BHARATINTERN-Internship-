
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bharat_intern_projects'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL as id ' + db.threadId);
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle Registration Form Submission
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Error registering user: ' + err.stack);
            res.status(500).send('Error registering user');
            return;
        }
        console.log('User registered successfully');
        res.send('User registered successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
