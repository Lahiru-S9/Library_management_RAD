import mongoose from 'mongoose';

// Define the book schema
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publicationYear: {
        type: Number,
        required: true,
    },
    ISBN: {
        type: String,
        unique: true, // Ensures uniqueness of ISBN
        required: true,
    },
    genre: {
        type: String,
    },
    // You can add more fields as needed
});

// Create a model for the book schema
const Book = mongoose.model('books', BookSchema);

export default Book;
