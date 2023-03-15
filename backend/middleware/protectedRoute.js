import jwt from 'jsonwebtoken';

export const protectedRoute = async (req, res, next) => {
	const authHeaders = req.headers.authorization || req.headers.Authorization;

	if (!authHeaders && !authHeaders?.startsWith('Bearer'))
		return res.status(401).json({
			message:
				'Unauthorized user, you are not logged in. Please log in again to get access..',
		});

	const token = authHeaders.split(' ')[1];

	const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

	req.user = decodedToken.user;

	next();
};
