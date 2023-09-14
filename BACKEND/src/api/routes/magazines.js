import express from 'express';
const router = express.Router();

import Magazine from '../model/magazine.js';

router.route('/add').post((req,res)=>{
  const title = req.body.title;
  const issuedDate = req.body.issuedDate;
  const typeoftheMagazine = req.body.typeoftheMagazine;
  const publisher = req.body.publisher;
  const IDM = req.body.IDM;

  const newMagazine = new Magazine({
    title,
    issuedDate,
    typeoftheMagazine,
    publisher,
    IDM,
  });

  newMagazine.save().then(()=>{
    res.json("Magazine added")
  }).catch((err)=>{
    console.log(err);
  })
});

router.route("/").get((req,res)=>{
  Magazine.find().then((magazines)=>{
    res.json(magazines);
  }).catch((err)=>{
    console.log(err);
  })
})

router.route("/update/:id").put(async (req,res)=>{
  let userId = req.params.id;
  const {title, issuedDate, typeoftheMagazine, publisher, IDM} = req.body;

  const updateMagazine = {
    title,
    issuedDate,
    typeoftheMagazine,
    publisher,
    IDM,
  }

  const update = await Magazine.findByIdAndUpdate(userId, updateMagazine).then(()=>{
    res.status(200).send({status: "Magazine updated"})

  })
  .catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data", error: err.message});
  })
})

router.route("/delete/:id").delete(async (req,res)=>{
  let userId = req.params.id;

  await Magazine.findByIdAndDelete(userId).then(()=>{
    res.status(200).send({status: "Magazine deleted"});
  }).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with deleting data", error: err.message});
  })
})

module.export = router;