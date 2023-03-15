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

	res.status(201).json({ user });
};

// *@desc Update the user profile
// *@route GET /api/users/update-user
// *@access PRIVATE
export const updateUser = async (req, res) => {
	res.json('updateUser route');
};
