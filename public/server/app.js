const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Mujtaba:pirogrammer@cluster0.k2xjzsu.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database!');
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists in database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create new user object and save to database
    const newUser = new User({ email, password, name });
    await newUser.save();

    res.status(201).send('User created successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

// Login endpoint
app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User does not exist');
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }

    res.status(200).send('Login successful!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
