import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '../hooks/useRefreshToken';
import { useAuthStore, usePersistStore } from '../store';

const PersistLogin = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { accessToken } = useAuthStore(state => state.auth);
	const { persistLogin } = usePersistStore(state => state);

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
		!accessToken && persistLogin ? verifyRefreshToken() : setIsLoading(false);

		return () => (isMounted = false);
	}, []);

	return (
		<>{!persistLogin ? children : isLoading ? <p>Loading...</p> : children}</>
	);
};

export default PersistLogin;
