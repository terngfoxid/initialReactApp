import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './authcontext';

interface ProtectedRouteProps {
  permission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ permission }) => {
  const Auth = useAuth();

  if (!Auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (permission) {
    const user  = Auth.getCurrentUser()
    //permission denined
    //return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;