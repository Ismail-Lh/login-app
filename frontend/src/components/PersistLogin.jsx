import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '../hooks/useRefreshToken';
import { useAuthStore } from '../store';

const PersistLogin = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { accessToken } = useAuthStore(state => state.auth);

	useEffect(() => {
		let isMounted = true;

		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			} finally {
				isMounted && setIsLoading(false);
			}
		};

		// persist added here AFTER tutorial video
		// Avoids unwanted call to verifyRefreshToken
		!accessToken ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, []);

	useEffect(() => {
		console.log(`isLoading: ${isLoading}`);
		console.log(`aT: ${JSON.stringify(accessToken)}`);
	}, [isLoading]);

	return <>{isLoading ? <p>Loading...</p> : children}</>;
};

export default PersistLogin;
