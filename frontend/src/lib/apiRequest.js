import axios from './axios';

export const getRefreshToken = async () => {
	const { data } = await axios.get('/auth/refresh');

	return data;
};

export const isValidUser = async username => {
	const { data, status } = await axios.post('/auth', { username });

	return { data, status };
};

const sendEmail = async (username, userEmail, text, subject) => {
	return await axios.post('/auth/register-mail', {
		username,
		userEmail,
		text,
		subject,
	});
};

// ?: Get an user with his name
export const getUser = async username => {
	const { data } = await axios.get(`/users/${username}`);

	return data;
};

// ?: Create a new user and send an email to the registerUser email
export const registerUser = async user => {
	const {
		data: { message },
		status,
	} = await axios.post(`/auth/register`, user);

	const { username, email } = user;

	if (status === 201) {
		await sendEmail(username, email, message);
	}

	return message;
};

// ?: Login to a user account
export const login = async ({ username, password }) => {
	const { data } = await axios.post(`/auth/login`, { username, password });

	return data;
};

// ?: Login to a user account
export const logout = async () => {
	const { data } = await axios.post(`/auth/logout`);

	return data;
};

// ?: Update current login user account info
export const updateCurrentUser = async ({ values: user, token }) => {
	const { data } = await axios.patch('/users/update-current-user', user, {
		headers: { Authorization: `Bearer ${token}` },
	});

	return data;
};

// ?: Generate a 6 digit OTP code
export const generateOtp = async username => {
	const {
		data: { otpCode },
		status,
	} = await axios.get('/auth/generate-otp', {
		params: { username },
	});

	// ?: Send the OTP to the user email
	if (status === 201) {
		const { email } = await getUser(username);

		const text = `Your password recovery OTP code is ${otpCode}. Verify an recover your password.`;

		const subject = 'Password recovery OTP';

		await sendEmail(username, email, text, subject);
	}

	return otpCode;
};

// ?: Verify the OTP code
export const verifyOtp = async ({ username, otpCode }) => {
	const { data, status } = await axios.get('/auth/verify-otp', {
		params: { username, otpCode },
	});

	return { data, status };
};

// ?: Reset password req
export const resetPassword = async ({ username, password }) => {
	const { data, status } = await axios.patch('/auth/reset-password', {
		username,
		password,
	});

	return { data, status };
};

// ?:Create a user session
export const createResetSession = async () => {
	const { data, status } = await axios.get('/auth/create-reset-session');

	return { data, status };
};
