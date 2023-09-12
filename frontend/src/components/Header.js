import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  // Function to handle logout (you can replace this with your actual logout logic)
  const handleLogout = () => {
    // Make an API request to your backend logout route
    axios
      .get("http://localhost:8090/auth/logout")
      .then((response) => {
        // Handle successful logout response (e.g., clear tokens, user data, etc.)
        console.log("Logged out successfully");
        // You can also redirect the user to the login page or perform other actions here
      })
      .catch((error) => {
        // Handle logout error
        console.error("Error during logout:", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{ color: "red" }}>
          Home
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/login" className="nav-link active" aria-current="page">
                Log In
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/books" className="nav-link">
                Books
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Other
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Newspapers
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Magazines
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider"></hr>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Computers
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          {/* Logout button */}
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Logout
      </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
