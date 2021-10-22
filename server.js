const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const winRoute = require('./routes/winner');

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.use('/api/players', winRoute);

mongoose.connect('mongodb://localhost/cardsGame', () => {
  console.log('DB Connected!!');
});

app.listen(port, () => console.log(`listing port ${port}`));
