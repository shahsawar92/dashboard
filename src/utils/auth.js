import { Navigate, useLocation } from "react-router";
import { isAuthenticated } from './isauth';

export function RequireAuth({ children }) {
  let auth = isAuthenticated();
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}