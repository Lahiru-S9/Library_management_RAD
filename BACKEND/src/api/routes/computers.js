import express from 'express';
const router = express.Router();

import Computer from '../model/computer.js';

router.route('/add').post((req,res)=>{
  const IDC = req.body.IDC;
  const brand = req.body.brand;
  const status = req.body.status;
  const manufacturedYear = req.body.manufacturedYear;

  const newComputer = new Computer({
    IDC,
    brand,
    status,
    manufacturedYear,
  });

  newComputer.save().then(()=>{
    res.json("Computer added")
  }).catch((err)=>{
    console.log(err);
  })
})

router.route("/").get((req,res)=>{
  Computer.find().then((computers)=>{
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

module.export = router;