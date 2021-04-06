require('dotenv').config();
const express = require('express');
const UserService = require('./services/Service');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/v1/upload', require('./controllers/bassists'));


app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
