const express = require('express');
const router = express.Router();

router.use(express.json());

const db = require('../Db/db');
const app = express();


router.get('/' , async (req , res ) => { 
  
})

router.post('/add' , async (req , res)=>{
    const { 
      doctorId ,   
      patientId ,
      patientName ,
      patientPhone , 
      consultationType,
      date , 
      time,
      isAccepted
     } = req.body;
     console.log(patientId);
    try {   
        const [isExist] = await db.query('SELECT * FROM appoinetement WHERE doctorId = ? AND patientId = ?' ,
             [doctorId , patientId] , (err) => {
               if(err) {
                res.status(500).send({'message' : 'server error'});
                return;
               }
             });
       if(isExist.length > 0) {
            res.status(409).send('Already Exist');
            return;
        }  
        await db.query('INSERT INTO appoinetement (doctorId , patientId , patientName , patientPhone , consultationType , date,time , isAccepted ) VALUES (?,?,?,?,?,?,?,?)',
             [doctorId ,  patientId , patientName , patientPhone , consultationType , date,time , isAccepted] );
              res.status(201).send({'message' : 'added succesfully'});
    } catch (error) {
        console.error('error : ' ,error);
        res.status(500).send({'message' : 'error'});
    }
});


router.delete('/delete' , async(req , res) => {
  const id  = req.body;

  try {
    db.query('DELETE FROM appoinetement WHERE id = ? ' , [id] ,
        (err) => {
            if(err){
                res.status(500).send({'message' : 'server error'});
                return;
            }else {
                res.status(204).send({'message' : 'delete successfully'});
            }
        }
    );
  } catch (error) {
    console.error('error : ' ,error);
    res.status(500).send({'message' : 'error'});
  }
});

router.put('/modify' , async(req , res) => {
    const { 
        patientName ,
        patientPhone , 
        consultationType,
        date , 
        time,
        isAccepted
       } = req.body;
  
    try {
      db.query('UPDATE appoinetement SET  patientName = ? , patientPhone = ? , consultationType = ? , date = ? , time = ? , , isAccepted = ? ' ,
        [patientName , patientPhone , consultationType ,date , time , isAccepted ],
        (err) => {
              if(err){
                  res.status(500).send({'message' : 'server error'});
                  return;
              }else {
                  res.status(204).send({'message' : 'modify successfully'});
              }
          }
      );
    } catch (error) {
      console.error('error : ' ,error);
      res.status(500).send({'message' : 'error'});
    }
  });

module.exports = router;