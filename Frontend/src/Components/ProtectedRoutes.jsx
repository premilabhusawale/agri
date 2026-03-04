import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ children, requiredRole }) => {
    const { user, jwt, authRestored, loading } = useSelector(state => state.auth);
    const location = useLocation();

    // Wait for restoreAuth to finish OR if still loading
    if (!authRestored || loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="mt-4 text-gray-600">Checking authentication...</p>
            </div>
        );
    }

    // Not logged in → redirect to Auth
    if (!jwt) {
        return <Navigate to="/Auth" state={{ from: location }} replace />;
    }

    // JWT exists but user not loaded yet → wait
    if (!user) return null;

    // Role check
    if (requiredRole) {
        const userRole = (user.role || '').toUpperCase();
        if (userRole !== requiredRole.toUpperCase()) {
            return <Navigate to="/" replace />;
        }
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoutes;