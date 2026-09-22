import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  const storedAuth = localStorage.getItem("nexusAuth");

  // User is not logged in
  if (!storedAuth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  let auth;

  // Protect against corrupted localStorage data
  try {
    auth = JSON.parse(storedAuth);
  } catch (error) {
    console.error("Invalid NEXUS authentication session.");

    localStorage.removeItem("nexusAuth");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Authentication flag missing
  if (!auth?.isAuthenticated) {
    localStorage.removeItem("nexusAuth");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Role protection
  if (
    allowedRoles &&
    !allowedRoles.includes(auth.role)
  ) {
    // Student
    if (auth.role === "student") {
      return (
        <Navigate
          to="/student"
          replace
        />
      );
    }

    // Faculty
    if (auth.role === "faculty") {
      return (
        <Navigate
          to="/faculty"
          replace
        />
      );
    }

    // Management
    if (auth.role === "management") {
      return (
        <Navigate
          to="/management"
          replace
        />
      );
    }

    // Unknown role
    localStorage.removeItem("nexusAuth");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Authorized
  return children;
}

export default ProtectedRoute;