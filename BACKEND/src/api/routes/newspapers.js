import express from 'express';
const router = express.Router();

import Newspaper from '../model/newspaper.js';

router.route('/add').post((req,res)=>{
  const title = req.body.title;
  const issuedDate = req.body.issuedDate;
  const typeoftheNewspaper = req.body.typeoftheNewspaper;
  const publisher = req.body.publisher;
  const IDN = req.body.IDN;

  const newNewspaper = new Newspaper({
    title,
    issuedDate,
    typeoftheNewspaper,
    publisher,
    IDN,
  });

  newNewspaper.save().then(()=>{
    res.json("Newspaper added")
  }).catch((err)=>{
    console.log(err);
  })
});

router.route("/").get((req,res)=>{
  Newspaper.find().then((newspapers)=>{
    res.json(newspapers);
  }).catch((err)=>{
    console.log(err);
  })
})

router.route("/update/:id").put(async (req,res)=>{
  let userId = req.params.id;
  const {title, issuedDate, typeoftheNewspaper, publisher, IDN} = req.body;

  const updateNewspaper = {
    title,  
    issuedDate,
    typeoftheNewspaper,
    publisher,
    IDN,
  }

  const update = await Newspaper.findByIdAndUpdate(userId, updateNewspaper).then(()=>{
    res.status(200).send({status: "Newspaper updated"})

  })
  .catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data", error: err.message});
  })
})

router.route("/delete/:id").delete(async (req,res)=>{
  let userId = req.params.id;

  await Newspaper.findByIdAndDelete(userId).then(()=>{
    res.status(200).send({status: "Newspaper deleted"});
  }).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with deleting data", error: err.message});
  })
})

module.export = router;
