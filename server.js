const express = require('express');
const app = express();
const path = require('path');
const homeRoute = require('./routes/homeRoute');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoute);

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
