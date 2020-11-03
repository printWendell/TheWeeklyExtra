const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const Port = process.env.PORT || 5000;

const { User } = require('./models/User');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get('/api/', async (req, res) => {
  const results = await User.findAll()
  console.log(results)
    res.json(results);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(Port, () => console.log(`listening on port ${Port}`))