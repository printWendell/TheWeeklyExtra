const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');
const Port = process.env.PORT || 5000;

const { User } = require('./models/User');

const authRoutes = require('./routes/authRoutes')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.use("/api/auth", authRoutes)

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get('/api/', async (req, res) => {
  const results = await User.findAll()
    res.json(results);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// catch all error route
app.use(async (req, res, next) => {
  //   pass to error handler
  next(createError.NotFound());
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});


app.listen(Port, () => console.log(`listening on port ${Port}`))