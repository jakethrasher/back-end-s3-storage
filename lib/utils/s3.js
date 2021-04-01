require('dotenv').config();
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

const s3 = new aws.S3({apiVersion:'2006-03-01'});

const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:'',
        metadata: (req, file, cb) => {
            cb(null, {fieldName:file.fieldname});
        },
        key:(req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`)
        }
    })
})

