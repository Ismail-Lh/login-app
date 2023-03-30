export const profileFields = [
	[
		{ name: 'mobile', type: 'text', placeholder: 'Mobile No' },
		{ name: 'email', type: 'text', placeholder: 'Email Address' },
		{ name: 'address', type: 'text', placeholder: 'Address' },
	],
	[
		{ name: 'firstName', type: 'text', placeholder: 'First Name' },
		{
			name: 'lastName',
			type: 'text',
			placeholder: 'Last Name',
		},
	],
];

export const usernameFields = [
	[{ name: 'username', type: 'text', placeholder: 'Enter your username' }],
];

export const passwordFields = [
	[
		{
			name: 'password',
			type: 'password',
			placeholder: 'Enter your password',
		},
	],
];

export const registerFields = [
	[
		{ name: 'email', type: 'email', placeholder: 'Enter your email address' },
		{ name: 'userName', type: 'text', placeholder: 'Enter your username' },
		{ name: 'password', type: 'password', placeholder: 'Enter your password' },
	],
];

export const resetFields = [
	[
		{ name: 'password', type: 'text', placeholder: 'Enter new password' },
		{
			name: 'confirmPassword',
			type: 'text',
			placeholder: 'Confirm password',
		},
	],
];
