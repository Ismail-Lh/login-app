import axios from 'axios';

const URL = import.meta.env.VITE_URL_BASE;

const API_URL = axios.create({
	baseURL: URL,
});

export const isValidUser = async username => {
	const { data } = await API_URL.post('/auth', { username });

	return data;
};

const sendEmail = async (username, userEmail, text, subject) => {
	try {
		await API_URL.post('/auth/register-mail', {
			username,
			userEmail,
			text,
			subject,
		});
	} catch (error) {
		console.log(error);
	}
};

// ?: Get an user with his name
export const getUser = async username => {
	const { data } = await API_URL.get(`/users/${username}`);

	return data;
};

// ?: Create a new user and send an email to the registerUser email
export const registerUser = async user => {
	const {
		data: { message },
		status,
	} = await API_URL.post(`/auth/register`, user);

	// const { username, email } = user;

	// if (status === 201) {
	// 	await sendEmail(username, email, message);
	// }

	return message;
};

// ?: Login to a user account
export const login = async ({ username, password }) => {
	const { data } = await API_URL.post(`/auth/login`, { username, password });

	return data;
};

// ?: Update current login user account info
export const updateCurrentUser = async user => {
	const token = localStorage.getItem('token');

	const { data } = await API_URL.patch('/users/update-current-user', user, {
		headers: { authorization: `Bearer ${token}` },
	});

	return data;
};

// ?: Generate a 6 digit OTP code
export const generateOtp = async username => {
	const {
		data: { otpCode },
		status,
	} = await API_URL.get('/auth/generate-otp', {
		params: { username },
	});

	// ?: Send the OTP to the user email
	if (status === 201) {
		const {
			data: { email },
		} = await getUser(username);

		const text = `Your password recovery OTP code is ${otpCode}. Verify an recover your password.`;

		const subject = 'Password recovery OTP';

		await sendEmail(username, email, text, subject);
	}

	return otpCode;
};

// ?: Verify the OTP code
export const verifyOtp = async ({ username, otpCode }) => {
	const { data, status } = await API_URL.get('/auth/verify-otp', {
		params: { username, otpCode },
	});

	return { data, status };
};

// ?: Reset password req
export const resetPassword = async ({ username, password }) => {
	const { data, status } = await API_URL.patch('/auth/reset-password', {
		username,
		password,
	});

	return { data, status };
};
