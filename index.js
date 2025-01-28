const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/schema'); // Assuming schema.js is in the "models" folder
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDB', { useNewUrlParser: true, useUnifiedTopology: true });

// POST route to create a new user
app.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    await newUser.save(); // Save the new user to the database
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ message: 'Error creating user', error: err });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});