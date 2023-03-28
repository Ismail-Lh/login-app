import jwt from 'jsonwebtoken';

import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => {
	const cookies = req.cookies;
	console.log(
		'🚀 ~ file: authMiddleware.js:7 ~ protectedRoute ~ cookies:',
		cookies
	);

	const authHeaders = req.headers.authorization || req.headers.Authorization;

	if (!authHeaders && !authHeaders?.startsWith('Bearer'))
		return res.status(401).json({
			message:
				'Unauthorized user, you are not logged in. Please log in again to get access..',
		});

	const token = authHeaders.split(' ')[1];

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

	const user = await User.findOne({ username })
		.select('-password')
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	if (!user)
		res.status(404).json({
			message: 'Unauthorized user, invalid username. Please try again.',
		});

	next();
};

// ?: Check for duplicate username or email address
export const checkDuplicateUser = async (req, res, next) => {
	const { email, username, userName } = req.body;

	const name = username || userName;

	// !: Check for duplicate users
	const usernameExistPromise = User.findOne({ username: name })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	const emailExistPromise = User.findOne({ email })
		.collation({ locale: 'en', strength: 2 })
		.lean()
		.exec();

	const [usernameExist, emailExist] = await Promise.all([
		usernameExistPromise,
		emailExistPromise,
	]);

	req.userId;
	req.usernameExist = usernameExist;
	req.emailExist = emailExist;

	next();
};
