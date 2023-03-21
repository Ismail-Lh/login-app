import User from '../models/User.js';

// *@desc Get a user by name
// *@route GET /api/users/:username
// *@access PRIVATE
export const getUser = async (req, res) => {
	const { username } = req.params;

	const user = await User.findOne({ username })
		.select('-password')
		.lean()
		.exec();

	if (!user)
		res.status(404).json({
			message: 'No user found with this name. Please enter another username.',
		});

	res.status(201).json(user);
};

// *@desc Update the current user profile
// *@route PATCH /api/users/update-current-user
// *@access PRIVATE
export const updateCurrentUser = async (req, res) => {
	const id = req.user._id;

	const { firstName, lastName, email, mobile, address, profile, username } =
		req.body;

	if (!id)
		return res.status(401).json({
			message:
				'Unauthorized user, you are not logged in. Please log in again to get access...',
		});

	const user = await User.findById(id).select('-password').exec();

	if (!user)
		res.status(404).json({
			message: 'User not found. Please try again.',
		});

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

	if (usernameExist && usernameExist?._id.toString() !== id)
		return res.status(409).json({
			message: 'Username already used! Please try another username!',
		});

	if (emailExist && emailExist?._id.toString() !== id)
		return res.status(409).json({
			message: 'Email address already used! Please try another email address!',
		});

	user.username = username || user.username;
	user.email = email || user.email;
	user.lastName = lastName || user.lastName;
	user.firstName = firstName || user.firstName;
	user.mobile = mobile || user.mobile;
	user.address = address || user.address;
	user.profile = user.profile === profile ? user.profile : profile;

	await user.save();

	res.status(201).json({ message: 'User updated successfully!', user });
};
