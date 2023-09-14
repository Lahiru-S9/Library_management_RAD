import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useBooksContext } from '../hooks/useBooksContext';

function AddBook() {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();
  // Define state variables to store form input values
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [ISBN, setISBN] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Create a book object with the form data
    const newBook = {
      title,
      author,
      publicationYear,
      ISBN,
      genre,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(newBook),
    };

    try {
      const response = await fetch('http://localhost:8090/book/add', requestOptions);

      if (response.status === 200) {
        alert('Book added');
        // Reset the form fields
        setTitle('');
        setAuthor('');
        setPublicationYear('');
        setISBN('');
        setGenre('');
        dispatch({type: 'CREATE_BOOK', payload: newBook});
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add book');
      }
    } catch (err) {
      console.error(err);
      setError('Error adding book');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="publicationYear" className="form-label">
            Publication Year
          </label>
          <input
            type="number"
            className="form-control"
            id="publicationYear"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ISBN" className="form-label">
            ISBN
          </label>
          <input
            type="text"
            className="form-control"
            id="ISBN"
            value={ISBN}
            onChange={(e) => setISBN(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
    </div>
      </div>
    </div>
  );
}

export default AddBook;
