import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
const router = express.Router();

//require auth for all workout routes
router.use(requireAuth);

import Book from '../model/book.js';

router.route('/add').post((req,res)=>{
    const title = req.body.title;
    const author = req.body.author;
    const publicationYear = Number(req.body.publicationYear);
    const ISBN = req.body.ISBN;
    const genre = req.body.genre;
    const user_id = req.user._id;

    const newBook = new Book({
        title,
        author,
        publicationYear,
        ISBN,
        genre,
        user_id,
    });

    newBook.save().then(()=>{
        res.json("Book added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    const user_id = req.user._id

    Book.find( {user_id} ).then((books)=>{
        res.json(books);
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async (req,res)=>{
    let userId = req.params.id;
    const {title, author, publicationYear, ISBN, genre} = req.body;

    const updateBook = {
        title,
        author,
        publicationYear,
        ISBN,
        genre,
    }
    
    const update = await Book.findByIdAndUpdate(userId, updateBook).then(()=>{
        res.status(200).send({status: "Book updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let userId = req.params.id;

    await Book.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Book deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete book", error: err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let userId = req.params.id;

    const book = await Book.findById(userId).then((book)=>{
        res.status(200).send({status: "Book fetched", book});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get book", error: err.message});
    })
})

    

module.exports = router;
