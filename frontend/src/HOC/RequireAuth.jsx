import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store';

const RequireAuth = ({ children }) => {
	const { accessToken } = useAuthStore(state => state.auth);

	const location = useLocation();

	if (!accessToken)
		return <Navigate to='/' state={{ from: location }} replace />;

	return children;
};

export default RequireAuth;
