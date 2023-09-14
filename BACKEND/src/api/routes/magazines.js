import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();



router.use(requireAuth);
import Magazine from '../model/magazine.js';

router.route('/add').post((req,res)=>{
  const title = req.body.title;
  const issuedDate = req.body.issuedDate;
  const typeoftheMagazine = req.body.typeoftheMagazine;
  const publisher = req.body.publisher;
  const IDM = req.body.IDM;
  const user_id = req.user._id;

  const newMagazine = new Magazine({
    title,
    issuedDate,
    typeoftheMagazine,
    publisher,
    IDM,
    user_id,
  });

  newMagazine.save().then(()=>{
    res.json("Magazine added")
  }).catch((err)=>{
    console.log(err);
  })
});

router.route("/").get((req,res)=>{

  const user_id = req.user._id

  Magazine.find({user_id}).then((magazines)=>{
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

router.route("/get/:id").get(async (req,res)=>{
  let userId = req.params.id;

  const magazine = await Magazine.findById(userId).then((magazine)=>{
      res.status(200).send({status: "Book fetched", magazine});
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get magazine", error: err.message});
  })
})

module.exports = router;