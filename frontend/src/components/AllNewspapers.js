import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNewspapersContext } from '../hooks/useNewspapersContext';

export default function AllNewspapers() {
  const { newspapers, dispatch } = useNewspapersContext();
  const { user } = useAuthContext();

  useEffect(() => {
    function getNewspapers() {
      if (!user) {
        return;
      }

      const requestOptions = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      fetch('http://localhost:8090/newspaper/', requestOptions)
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: 'SET_NEWSPAPERS', payload: data });
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    if (user) {
      getNewspapers();
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
      <h1>All Newspapers</h1>
      <Link to="/add-newspaper" className="btn btn-primary mb-3">
        Add Newspaper
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Published Date</th>
            <th>Publisher</th>
            <th>NOP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newspapers.map((newspaper) => (
            <tr key={newspaper._id}>
              <td>{newspaper.title}</td>
              <td>{newspaper.publishedDate}</td>
              <td>{newspaper.publisher}</td>
              <td>{newspaper.numberOfPages}</td>
              <td>
              <Link
                  to={`/update-newspaper/${newspaper._id}`}
                  className="btn btn-warning me-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(newspaper._id)}
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

