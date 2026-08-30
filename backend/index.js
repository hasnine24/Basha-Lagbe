const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const Property = require('./models/Property');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); 
app.use(express.json()); 

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bashalagbe';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Basha-Lagbe Backend is running!');
});

app.post('/properties', async (req, res) => {
  try {
    const newProperty = new Property(req.body);
    const savedProperty = await newProperty.save();

    console.log('Property added successfully!');

    res.status(201).json({
      message: 'Property added successfully!',
      property: savedProperty
    });

  } catch (error) {
    console.error('Error saving property:', error);
    res.status(500).json({
      message: 'Failed to add property',
      error: error.message
    });
  }
});

app.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } 
  catch (error) {
    res.status(500).json({ message: 'Failed to fetch properties' });
  }
});

