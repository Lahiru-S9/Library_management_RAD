import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useComputerContext } from '../hooks/useComputersContext';

function AddComputer() {
  const { dispatch } = useComputerContext();
  const { user } = useAuthContext();
  // Define state variables to store form input values
  const [IDC, setIDC] = useState('');
  const [brand, setBrand] = useState('');
  const [status, setStatus] = useState('');
  const [manufacturedYear, setManufacturedYear] = useState('');
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    // Create a computer object with the form data
    const newComputer = {
      IDC,
      brand,
      status,
      manufacturedYear,
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(newComputer),
    };

    try {
      const response = await fetch('http://localhost:8090/computer/add', requestOptions);

      if (response.status === 200) {
        alert('Computer added');
        // Reset the form fields
        setIDC('');
        setBrand('');
        setStatus('');
        setManufacturedYear('');
        dispatch({ type: 'CREATE_COMPUTER', payload: newComputer });
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to add computer');
      }
    } catch (err) {
      console.error(err);
      setError('Error adding computer');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div>
            <h2>Add a New Computer</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="IDC" className="form-label">
                  IDC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="IDC"
                  value={IDC}
                  onChange={(e) => setIDC(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="brand" className="form-label">
                  Brand
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="manufacturedYear" className="form-label">
                  Manufactured Year
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="manufacturedYear"
                  value={manufacturedYear}
                  onChange={(e) => setManufacturedYear(e.target.value)}
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

export default AddComputer;
