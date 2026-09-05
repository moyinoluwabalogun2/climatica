import {
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";


function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const {
    user,
  } = useAuth();


  const location =
    useLocation();


  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from:
            location.pathname,
        }}
      />
    );
  }


  if (
    allowedRoles &&
    !allowedRoles.includes(
      user.role
    )
  ) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  return children;
}


export default ProtectedRoute;