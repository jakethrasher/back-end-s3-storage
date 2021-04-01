require('dotenv').config();
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');

// customize how multer stores files. allows to keep file name 
// const storage = multer.diskStorage({
//     destination:(req, file, cb)=>{
//         cb(null, 'uploads');
//     },
//     filename: (req, file, cb)=>{
//         const { originalname } = file;
//         cb(null,` ${uuid()} - ${originalname}`);
//     }
// })
// const upload = multer({ storage })

app.use(express.json());
app.use(express.static('public'));

aws.config.update({
    secretAccessKey:process.env.AWS_SES_SECRET_ACCESS_KEY,
    accessKeyId:process.env.AWS_SES_ACCESS_KEY_ID,
    region:process.env.AWS_SES_REGION
});
const s3 = new aws.S3({apiVersion:'2006-03-01'});

const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket:'my-first-bucket-cool',
        acl:'public-read',
        metadata: (req, file, cb) => {
            cb(null, { fieldName:file.fieldname });
        },
        key:(req, file, cb) => {
            const ext = path.extname(file.originalname);
            console.log(ext);
            cb(null, `${uuid()}${ext}`)
        }
    })
})

app.post('/upload', upload.single('avatar'),(req, res)=>{
   res.json({ status: 'OK' })
})

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
