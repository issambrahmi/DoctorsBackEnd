const express = require('express');
const router = express.Router();

const db = require('../Db/db');

router.get('/' , async (req , res)=>{
    const wilaya = req.query;
    try {    
        const [specialities] = await db.query('SELECT * FROM speciality');
        const [mostPopular] = await db.query('SELECT * FROM doctor ORDER BY patients ASC LIMIT 2');
        const [nearest] = await db.query('SELECT * FROM doctor WHERE wilaya = ? LIMIT 2' , [wilaya]);
        res.status(200).send({
            'specialities' : specialities,
            'mostPopular' : mostPopular,
            'nearest' : nearest
        });
    } catch (error) {
        console.error('error : ' ,error);
        res.status(500).send({'message' : 'error'});
    }
})

module.exports = router;