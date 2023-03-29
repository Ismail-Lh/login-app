import { getRefreshToken } from '../lib/apiRequest';
import { useAuthStore } from '../store';

const useRefreshToken = () => {
	const { setAccessToken, setUser } = useAuthStore(state => state);

	const refresh = async () => {
		const { access_token, user } = await getRefreshToken();

		setAccessToken(access_token);
		setUser(user);

		return access_token;
	};

	return refresh;
};

export default useRefreshToken;
