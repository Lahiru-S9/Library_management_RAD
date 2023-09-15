import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useComputersContext } from '../hooks/useComputersContext';

export default function AllComputers() {
  const { computers, dispatch } = useComputersContext();
  const { user } = useAuthContext();

  useEffect(() => {
    function getComputers() {
      if (!user) {
        return;
      }

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      fetch('http://localhost:8090/computer/', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: 'SET_COMPUTERS', payload: data });
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    if (user) {
      getComputers();
    }
  }, [dispatch, user]);

  const handleDelete = (computerId) => {
    if (!user) {
      return;
    }
  
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    };
  
    fetch(`http://localhost:8090/computer/delete/${computerId}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          // Computer deleted successfully
          dispatch({ type: 'DELETE_COMPUTER', payload: computerId });
        } else {
          alert('Failed to delete computer');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error deleting computer');
      });
  };
  

  return (
    <div className="container">
      <h1>All Computers</h1>
      <Link to="/add-computer" className="btn btn-primary mb-3">
        Add Computer
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>IDC</th>
            <th>Brand</th>
            <th>Status</th>
            <th>Manufactured Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {computers.map((computer) => (
            <tr key={computer._id}>
              <td>{computer.IDC}</td>
              <td>{computer.brand}</td>
              <td>{computer.status}</td>
              <td>{computer.manufacturedYear}</td>
              <td>
                <Link
                  to={`/update-computer/${computer._id}`}
                  className="btn btn-warning me-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(computer._id)}
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
