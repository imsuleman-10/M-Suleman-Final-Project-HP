import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect based on role if unauthorized for this route
    if (user.role === 'Admin') return <Navigate to="/admin" replace />;
    if (user.role === 'Instructor') return <Navigate to="/instructor" replace />;
    return <Navigate to="/student" replace />;
  }

  return children;
};

export default ProtectedRoute;
