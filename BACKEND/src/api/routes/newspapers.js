import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();



router.use(requireAuth);
import Newspaper from '../model/newspaper.js';

router.route('/add').post((req,res)=>{
  const title = req.body.title;
  const issuedDate = req.body.issuedDate;
  const typeoftheNewspaper = req.body.typeoftheNewspaper;
  const publisher = req.body.publisher;
  const IDN = req.body.IDN;
  const user_id = req.user._id;

  const newNewspaper = new Newspaper({
    title,
    issuedDate,
    typeoftheNewspaper,
    publisher,
    IDN,
    user_id,
  });

  newNewspaper.save().then(()=>{
    res.json("Newspaper added")
  }).catch((err)=>{
    console.log(err);
  })
});

router.route("/").get((req,res)=>{

  const user_id = req.user._id

  Newspaper.find({user_id}).then((newspapers)=>{
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

router.route("/get/:id").get(async (req,res)=>{
  let userId = req.params.id;

  const newspaper = await Newspaper.findById(userId).then((newspaper)=>{
      res.status(200).send({status: "Book fetched", newspaper});
  }).catch((err)=>{
      console.log(err.message);
      res.status(500).send({status: "Error with get newspaper", error: err.message});
  })
})
module.exports = router;
