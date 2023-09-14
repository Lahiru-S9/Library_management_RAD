import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useAuthContext } from "../hooks/useAuthContext";

export default function AllBooks() {
  const { user } = useAuthContext();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    function getBooks() {
      if (!user) {
        return;
      }

      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      };

      fetch("http://localhost:8090/book/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setBooks(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    if (user) {
      getBooks();
    }
  }, [user]);

  const handleDelete = (bookId) => {
    if (!user) {
      return;
    }

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    };

    fetch(`http://localhost:8090/book/delete/${bookId}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          // Book deleted successfully
          alert('Book deleted');
          // You may also update your state or perform any necessary actions
        } else {
          alert('Failed to delete book');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error deleting book');
      });
  };

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
                 <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
