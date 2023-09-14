import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();



router.use(requireAuth);

import Computer from '../model/computer.js';

router.route('/add').post((req,res)=>{
  const IDC = req.body.IDC;
  const brand = req.body.brand;
  const status = req.body.status;
  const manufacturedYear = req.body.manufacturedYear;
  const user_id = req.user._id;


  const newComputer = new Computer({
    IDC,
    brand,
    status,
    manufacturedYear,
    user_id,
  });

  newComputer.save().then(()=>{
    res.json("Computer added")
  }).catch((err)=>{
    console.log(err);
  })
})

router.route("/").get((req,res)=>{
  const user_id = req.user._id

  Computer.find({user_id}).then((computers)=>{
    res.json(computers);
  }).catch((err)=>{
    console.log(err);
  })
})  

router.route("/update/:id").put(async (req,res)=>{
  let userId = req.params.id;
  const {IDC, brand, status, manufacturedYear} = req.body;

  const updateComputer = {
    IDC,
    brand,
    status,
    manufacturedYear,
  }

  const update = await Computer.findByIdAndUpdate(userId, updateComputer).then(()=>{
    res.status(200).send({status: "Computer updated"})

  })
  .catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data", error: err.message});
  })
})

router.route("/delete/:id").delete(async (req,res)=>{
  let userId = req.params.id;

  await Computer.findByIdAndDelete(userId).then(()=>{
    res.status(200).send({status: "Computer deleted"});
  }).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with deleting data", error: err.message});
  })
})

router.route("/get/:id").get(async (req,res)=>{
  let userId = req.params.id;

  const computer = await Computer.findById(userId).then((computer)=>{
      res.status(200).send({status: "Book fetched", computer});
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get computer", error: err.message});
  })
})


module.exports = router;