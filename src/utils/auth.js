// utils/auth.js

import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthMiddleware = () => {
    const history = useHistory();

    // Check if the user is authenticated
    const isAuthenticated = () => {
      // Your authentication logic goes here
      // Return true if authenticated, false otherwise
    };

    useEffect(() => {
      if (!isAuthenticated()) {
        // Redirect to the login page if not authenticated
        history.push("/login");
      }
    }, []);

    return isAuthenticated() ? <WrappedComponent /> : null;
  };

  return AuthMiddleware;
};

export default withAuth;
