const express = require('express');
const flowersRouter = require('./routes/flowers'); 
const userRouter = require('./routes/users')
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const cors = require('cors');

// cors permission to GET request from multiple environments

app.use(cors({
  origin: [
    'http://localhost:3000'
  ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

//uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/flowers', flowersRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Flower API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
