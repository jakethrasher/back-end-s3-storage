require('dotenv').config();
const express = require('express');
const app = express();
const upload = require('./utils/s3');

app.use(express.json());
app.use(express.static('public'));

app.post('/upload', upload.array('avatar'),(req, res)=>{
   res.json({ status: 'OK' })
   console.log(req.files[0].location);
})

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
