import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ROLES } from '../../utils/constants';

export default function ProtectedRoute({ allowedRoles = [], children }) {
    const { isAuthenticated, role } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles.length && !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
