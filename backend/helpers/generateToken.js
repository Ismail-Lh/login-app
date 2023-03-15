import jwt from 'jsonwebtoken';

export const accessToken = user => {
	return jwt.sign(
		{
			user,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{ expiresIn: '7d' }
	);
};
