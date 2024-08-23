const express = require('express');
const router = express.Router();

const db = require('../Db/db');

router.get('/' , async (req , res) =>{
    const {name , wilaya , speciality , gender} = req.query;
    const querryValues = [];

  try {
    let  querry = 'SELECT * FROM doctor WHERE 1=1';
    if(!name && !speciality && !wilaya && !gender){
      res.status(404).send('not found');
      return;
    }
    if(name){
      querry += ' AND name LIKE ?'  ;
      querryValues.push('%' + name + '%');
    }
    if(wilaya){
      querry += ' AND wilaya = ?' ;
      querryValues.push(wilaya);
    }
    if(speciality){
      querry += ' AND speciality = ?'  ;
      querryValues.push(speciality);
    }
    if(gender){
      querry += ' AND gender = ?'  ;
      querryValues.push(gender);
    }

    const [result] = await db.query(querry , querryValues);
    res.status(200).send(result);

  } catch (error) {
    console.error('error : ' , error);
    res.status(500).send({'message' : 'error'});
  }
})


module.exports = router;