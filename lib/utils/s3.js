require('dotenv').config();
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');

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
        contentType:multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
            cb(null, { fieldName:file.fieldname });
        },
        key:(req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}-${file.originalname}${ext}`)
        }
    })
})

module.exports = upload;
