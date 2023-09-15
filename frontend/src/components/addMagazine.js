import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMagazinesContext } from '../hooks/useMagazinesContext';

function AddMagazine() {
  const { dispatch } = useMagazinesContext();
  const { user } = useAuthContext();
  // Define state variables to store form input values
  const [title, setTitle] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [typeoftheMagazine, setTypeoftheMagazine] = useState('');
  const [publisher, setPublisher] = useState('');
  const [IDM, setIDM] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Create a magazine object with the form data
    const newMagazine = {
      title,
      issuedDate,
      typeoftheMagazine,
      publisher,
      IDM,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(newMagazine),
    };

    try {
      const response = await fetch('http://localhost:8090/magazine/add', requestOptions);

      if (response.status === 200) {
        alert('Magazine added');
        // Reset the form fields
        setTitle('');
        setIssuedDate('');
        setTypeoftheMagazine('');
        setPublisher('');
        setIDM('');
        dispatch({ type: 'CREATE_MAGAZINE', payload: newMagazine });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add magazine');
      }
    } catch (err) {
      console.error(err);
      setError('Error adding magazine');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div>
            <h2>Add a New Magazine</h2>
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
                <label htmlFor="issuedDate" className="form-label">
                  Issued Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="issuedDate"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="typeoftheMagazine" className="form-label">
                  Type of the Magazine
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="typeoftheMagazine"
                  value={typeoftheMagazine}
                  onChange={(e) => setTypeoftheMagazine(e.target.value)}
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
                <label htmlFor="IDM" className="form-label">
                  IDM
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="IDM"
                  value={IDM}
                  onChange={(e) => setIDM(e.target.value)}
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

export default AddMagazine;
