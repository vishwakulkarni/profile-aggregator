const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const auth = require('./middleware/auth');

const app = express();

//CORS
var cors = require('cors');
app.use(cors());
app.options('*', cors());

//connect database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const cb = function (err, numAffected) {
  if (err) {
    console.error(err.message);
  }
  console.log('num=', numAffected);
};

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
