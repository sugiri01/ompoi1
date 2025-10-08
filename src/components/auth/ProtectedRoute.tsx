import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
  viewOnlyRoles?: string[];
}

export function ProtectedRoute({ children, allowedRoles, viewOnlyRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If specific roles are required, check user role
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user.user_metadata?.userRole;
    
    if (!userRole || (!allowedRoles.includes(userRole) && !(viewOnlyRoles?.includes(userRole)))) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}