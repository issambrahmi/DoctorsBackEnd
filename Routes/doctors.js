const express = require('express');
const router = express.Router(); 
// DB
const db = require('../Db/db');

router.get('/' , async (req ,res) => {
  try {
    const [result] = await db.query('SELECT * FROM doctor');
    res.status(200).send(result);
  } catch (error) {
     console.error('erro ' , error);
     res.status(500).send('err');
  }
})

router.get('/:id' , async (req ,res) => {
    const {id} = req.params;
    try {
      const [result] = await db.query('SELECT * FROM doctor WHERE id = ?' , [id]);
      // doctor not found
      if(result.length == 0){
        res.status(404).send('doctor not found');
        return;
      }
      // doctor found
      res.status(200).send(result);

    } catch (error) {
       console.error('erro ' , error);
       res.status(500).send('err');
    }
  })
  



module.exports = router;