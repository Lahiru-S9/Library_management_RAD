// src/components/login.js

import React from "react";
//import axios from "axios";

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirect to the Google authentication route on the backend
    window.open("http://localhost:8090/auth/google", "_self")
  };

  return (
    <div className="container">
      <h1>Login with Google</h1>
      <button
        className="btn btn-primary"
        onClick={handleGoogleLogin}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
