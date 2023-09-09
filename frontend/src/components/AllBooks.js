import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Assuming you're using React Router

export default function AllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    function getBooks() {
      axios
        .get("http://localhost:8090/book/")
        .then((res) => {
          setBooks(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getBooks();
  }, []);

  return (
    <div className="container">
      <h1>All Books</h1>
      <Link to="/add" className="btn btn-primary mb-3">
        Add Book
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>ISBN</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationYear}</td>
              <td>{book.ISBN}</td>
              <td>{book.genre}</td>
              <td>
                <Link
                  to={`/update-book/${book._id}`}
                  className="btn btn-warning me-2"
                >
                  Update
                </Link>
                {/* <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteBook(book._id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
