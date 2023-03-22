import jwt from 'jsonwebtoken';

export const accessToken = ({ username, email, userId }) => {
	return jwt.sign(
		{ username, email, userId },
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: '1d',
		}
	);
};
