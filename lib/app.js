require('dotenv').config();
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

//customize how multer stores files. allows to keep file name 
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads');
    },
    filename: (req, file, cb)=>{
        const { originalname } = file;
        cb(null, originalname);
    }
})
const upload = multer({ storage })

app.use(express.json());
app.use(express.static('public'));

aws.config.update({
    secretAccessKey:process.env.AWS_SES_SECRET_ACCESS_KEY,
    accessKeyId:process.env.AWS_SES_ACCESS_KEY_ID,
    region:process.env.AWS_SES_REGION
});

app.post('/upload', upload.single('avatar'),(req, res)=>{
   res.send({status:'OK'})
})

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
