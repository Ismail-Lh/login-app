// *@desc Get a user by name
// *@route GET /api/users/:username
// *@access PRIVATE
export const getUser = async (req, res) => {
	res.json('getUser route');
};

// *@desc Update the user profile
// *@route GET /api/users/update-user
// *@access PRIVATE
export const updateUser = async (req, res) => {
	res.json('updateUser route');
};
