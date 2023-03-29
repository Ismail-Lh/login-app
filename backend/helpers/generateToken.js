import jwt from 'jsonwebtoken';

export const accessToken = ({ username, email, userId }) => {
	return jwt.sign(
		{ username, email, userId },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: '15m',
		}
	);
};

export const refreshToken = ({ username }) => {
	return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '1d',
	});
};
