const Bassist = require('../models/Bassist');

module.exports = class Service {
    static async create(bassist,imageUrl) {
        const newBassist = await Bassist.insert(bassist, imageUrl)

        return newBassist;
    }
};
