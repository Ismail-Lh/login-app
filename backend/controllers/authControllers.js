import otpGenerator from 'otp-generator';

import User from '../models/User.js';
import { accessToken } from '../helpers/generateToken.js';
import { generateEmail } from '../helpers/generateEmail.js';
import sendEmail from '../helpers/sendEmail.js';

// *@desc User authentication
// *@route POST /api/auth
// *@access public
export const authentication = async (req, res) => {
	res.json('authentication route');
};

// *@desc Create a new account
// *@route POST /api/auth/register
// *@access PUBLIC
export const register = async (req, res) => {
	const { username, email, password, profile } = req.body;

	// !: Check for required fields
	if (!username || !email || !password)
		return res.status(400).json({ message: 'All fields are required!' });

	// !: Check for duplicate users
	const usernameExistPromise = User.findOne({ username })
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

	if (usernameExist || emailExist)
		return res.status(409).json({
			message: 'User already exist! Please try again!',
		});

	// ?: Create a new user
	const newUser = await User.create({ username, password, email, profile });

	if (newUser)
		return res
			.status(201)
			.json({ message: `New user ${newUser.username} created!` });

	res
		.status(400)
		.json({ message: 'Invalid user data received. Please try again.' });
};

// *@desc Send the email
// *@route POST /api/auth/register-mail
// *@access PUBLIC
export const registerMail = async (req, res) => {
	const { username, userEmail, text, subject } = req.body;

	const email = {
		body: {
			name: username,
			intro:
				text || "Welcome to ou login app! We're exited to have you on board.",
			outro:
				"Ned help, or have a question? Just reply to this email, we'd love to help.",
		},
	};

	const emailBody = generateEmail.generate(email);

	try {
		await sendEmail({ userEmail, text, subject, emailBody });

		res.status(200).json({
			message:
				'You should receive an email from us. Please check your email address!',
		});
	} catch (error) {
		res.status(500).json({
			message: 'There was an error sending the email. Please try again later.',
		});
	}
};

// *@desc Login to a user account
// *@route POST /api/auth/login
// *@access PUBLIC
export const login = async (req, res) => {
	const { username, password } = req.body;

	// !: Check for required fields
	if (!username || !password)
		return res.status(400).json({ message: 'All Fields are required!' });

	// !: Check if the user exist
	const user = await User.findOne({ username }).exec();

	// !: Compare the password
	const isMatched = await user?.matchPassword(password);

	if (!user || !isMatched)
		res.status(401).json({
			message:
				'Unauthorized user, invalid username or password. Please try again.',
		});

	// !: Remove the password
	user.password = undefined;

	// ?: Create an accessToken
	const access_token = accessToken(user);

	res.status(200).json({
		message: 'Login successfully...',
		username: user.username,
		access_token,
	});
};

// *@desc Generate a 6 digit OTP
// *@route GET /api/auth/generate-otp
// *@access public
export const generateOtp = async (req, res) => {
	req.app.locals.OTP = await otpGenerator.generate(6, {
		upperCaseAlphabets: false,
		lowerCaseAlphabets: false,
		specialChars: false,
	});

	res.status(201).json({ otpCode: req.app.locals.OTP });
};

// *@desc Verify the OTP
// *@route /api/auth/verify-otp
// *@access public
export const verifyOtp = async (req, res) => {
	const { otpCode } = req.query;

	if (parseInt(req.app.locals.OTP) === parseInt(otpCode)) {
		res.status(201).json({ message: 'OTP verified successfully!' });

		// !: Reset the OTP value && set the resetSession value to true
		req.app.locals.OTP = null;
		req.app.locals.resetSession = true;
	}

	res.status(400).json({ message: 'Invalid OTP.' });
};

// *@desc Redirect the user successfully when OTP is valid
// *@route GET /api/auth/create-reset-session
// *@access private
export const createResetSession = async (req, res) => {
	if (req.app.locals.resetSession) {
		req.app.locals.resetSession = false;
		res.status(201).json({ message: 'Access granted!' });
	}

	res.status(440).json({ message: 'Session expired!' });
};

// *@desc Reset the user password
// *@route PATCH /api/auth/reset-password
// *@access private
export const resetPassword = async (req, res) => {
	const { username, password } = req.body;

	if (!req.app.locals.resetSession)
		return res.status(440).json({ message: 'Session expired!' });

	const user = await User.findOne({ username }).exec();

	user.password = password;

	await user.save();

	req.app.locals.resetSession = false;

	res.status(201).json({ message: `Password update successfully!` });
};
