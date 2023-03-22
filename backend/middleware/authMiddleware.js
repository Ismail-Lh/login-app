import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
	const authHeaders = req.headers.authorization || req.headers.Authorization;

	if (!authHeaders && !authHeaders?.startsWith('Bearer'))
		return res.status(401).json({
			message:
				'Unauthorized user, you are not logged in. Please log in again to get access..',
		});

	const token = authHeaders.split(' ')[1];

	console.log(token);

	const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

	req.username = decodedToken.username;
	req.email = decodedToken.email;
	req.userId = decodedToken.userId;

	next();
};

// ?: Create a locals variables middleware
export const localVariables = (req, res, next) => {
	req.app.locals = {
		OTP: null,
		resetSession: false,
	};

	next();
};

// ?: Check if the user is exist
export const checkUser = async (req, res, next) => {
	const { username } = req.method === 'GET' ? req.query : req.body;

	const userExist = await User.findOne({ username })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	if (!userExist)
		res.status(404).json({
			message: 'Unauthorized user, invalid username. Please try again.',
		});

	next();
};
