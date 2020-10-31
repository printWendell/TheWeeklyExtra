const express = require('express');
const app = express();
const path = require('path');

const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get('/api/', (req, res) => {
    res.json('hello');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.listen(Port, () => console.log(`listening on port ${Port}`))