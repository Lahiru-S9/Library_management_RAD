import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNewspapersContext } from '../hooks/useNewspapersContext';

function AddNewspaper() {
  const { dispatch } = useNewspapersContext();
  const { user } = useAuthContext();
  // Define state variables to store form input values
  const [title, setTitle] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [numberOfPages, setNumberOfPages] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Create a newspaper object with the form data
    const newNewspaper = {
      title,
      publishedDate,
      publisher,
      numberOfPages,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(newNewspaper),
    };

    try {
      const response = await fetch('http://localhost:8090/newspaper/add', requestOptions);

      if (response.status === 200) {
        alert('Newspaper added');
        // Reset the form fields
        setTitle('');
        setPublishedDate('');
        setPublisher('');
        setNumberOfPages('');
        dispatch({ type: 'CREATE_NEWSPAPER', payload: newNewspaper });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add newspaper');
      }
    } catch (err) {
      console.error(err);
      setError('Error adding newspaper');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div>
            <h2>Add a New Newspaper</h2>
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
                <label htmlFor="publishedDate" className="form-label">
                  Published Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="publishedDate"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="publisher" className="form-label">
                  Publisher
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="publisher"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numberOfPages" className="form-label">
                  Number of Pages
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="numberOfPages"
                  value={numberOfPages}
                  onChange={(e) => setNumberOfPages(e.target.value)}
                  required
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

export default AddNewspaper;
