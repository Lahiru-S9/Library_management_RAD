import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";




function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
 
  const handleClick = () => {
    logout()
  }

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
            {!user && (
              <div>
                <li className="nav-item">
                  <Link to="/login" className="nav-link active" aria-current="page">
                    Log In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
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
            {user && (
              <div>
                {/* Logout button */}
                <span> {user.email} </span>
                <button className="btn btn-outline-danger" onClick={handleClick}>
                  Logout
              </button>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
