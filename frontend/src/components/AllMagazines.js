import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useMagazinesContext } from '../hooks/useMagazinesContext';

export default function AllMagazines() {
  const { magazines, dispatch } = useMagazinesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    function getMagazines() {
      if (!user) {
        return;
      }

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      fetch('http://localhost:8090/magazine/', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: 'SET_MAGAZINES', payload: data });
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    if (user) {
      getMagazines();
    }
  }, [dispatch, user]);

  const handleDelete = (newspaperId) => {
    if (!user) {
      return;
    }
  
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    };
  
    fetch(`http://localhost:8090/newspaper/delete/${newspaperId}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          // Newspaper deleted successfully
          dispatch({ type: 'DELETE_NEWSPAPER', payload: newspaperId });
        } else {
          alert('Failed to delete newspaper');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error deleting newspaper');
      });
  };
  

  return (
    <div className="container">
      <h1>All Magazines</h1>
      <Link to="/add-magazine" className="btn btn-primary mb-3">
        Add Magazine
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Issued Date</th>
            <th>Type</th>
            <th>Publisher</th>
            <th>IDM</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {magazines.map((magazine) => (
            <tr key={magazine._id}>
              <td>{magazine.title}</td>
              <td>{magazine.issuedDate}</td>
              <td>{magazine.typeoftheMagazine}</td>
              <td>{magazine.publisher}</td>
              <td>{magazine.IDM}</td>
              <td>
                <Link
                  to={`/update-magazine/${magazine._id}`}
                  className="btn btn-warning me-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(magazine._id)}
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
