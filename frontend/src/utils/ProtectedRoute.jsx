import { Navigate } from 'react-router-dom';
import { getStoredUser, isAuthenticated, isAdminUser } from './authMiddleware';

export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const user = getStoredUser();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && !isAdminUser(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
