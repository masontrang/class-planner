// Require the modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');

// Create an express app
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database using Mongoose
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log('DB is connected'))
  .catch((err) => console.log(err));

// Define a schema for your data using Mongoose
const classSchema = new mongoose.Schema({
  id: Number,
  name: String,
  date: String,
  sections: Array,
});

// Create a model for your data using Mongoose
const Class = mongoose.model('Class', classSchema);

// Create a route to get all users from the database using Mongoose
app.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find({});
    res.json(classes);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// Create a route to create a new user and save it to the database using Mongoose
app.post('/classes', async (req, res) => {
  try {
    const class1 = new Class(req.body);
    await class1.save();
    res.status(201).send(class1);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a route to create a new user and save it to the database using Mongoose
app.get('/classes/:id', async (req, res) => {
  try {
    const classes = await Class.find({ id: req.params.id });
    res.json(classes);
  } catch (err) {
    res.status(500).send(err);
    console.log('err', err);
  }
});

// Start the server and listen on a port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
