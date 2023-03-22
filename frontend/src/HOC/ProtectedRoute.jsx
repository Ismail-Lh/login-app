import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';

const ProtectedRoute = ({ children }) => {
	const username = useAuthStore.getState().auth.username;

	const location = useLocation();

	if (!username) return <Navigate to='/' state={{ from: location }} replace />;

	return children;
};

export default ProtectedRoute;
