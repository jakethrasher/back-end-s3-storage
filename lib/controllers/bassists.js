const { Router } = require('express');
const upload = require('../utils/s3');
const Service = require('../services/Service');
const Bassist = require('../models/Bassist')

module.exports = Router()
    .post('/', upload.single('image'), async(req, res, next) =>{
        const bassist = req.body;
        const imageUrl = req.file.location;
        
        try {
            const newBassist = await Service.create(bassist, imageUrl);
            
           res.send(newBassist)
            
        } catch (error) {
            next(error);
        }
     
    })

    .get('/',async(req, res, next)=>{
        try {
            const allBassists = await Bassist.getAll()

            res.send(allBassists)

        } catch (error) {
            next(error);
        }
    })

