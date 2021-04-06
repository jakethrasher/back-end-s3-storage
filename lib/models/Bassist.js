const pool = require('../utils/pool');

module.exports = class Bassist{
    id;
    image;
    fullName;
    associatedActs;
    
    constructor(row){
        this.id = row.id;
        this.image = row.image_url;
        this.fullName = row.full_name;
        this.associatedActs = row.associated_acts
    }

    static async insert(bassist, imageUrl){
       
        const { rows } = await pool.query(`
        INSERT INTO bassists (image_url,full_name,associated_acts)
        VALUES($1, $2, $3)
        RETURNING *`,
        [imageUrl, bassist.fullName, bassist.associatedActs]);
        
        return new Bassist(rows[0]);
    }
    static async getAll(){
       
        const { rows } = await pool.query(`
        SELECT *
        FROM bassists`);
        
        return rows.map(row=>new Bassist(row));
    }
}