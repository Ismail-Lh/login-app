import { getRefreshToken } from '../lib/apiRequest';
import { useAuthStore } from '../store';

const useRefreshToken = () => {
	const { setAccessToken } = useAuthStore(state => state);

	const refresh = async () => {
		const { access_token } = await getRefreshToken();

		setAccessToken(access_token);

		return access_token;
	};

	return refresh;
};

export default useRefreshToken;
