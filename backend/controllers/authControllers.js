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
	res.json('register route');
};

// *@desc Send the email
// *@route POST /api/auth/register-mail
// *@access PUBLIC
export const registerMail = async (req, res) => {
	res.json('register mail route');
};

// *@desc Login to a user account
// *@route POST /api/auth/login
// *@access PUBLIC
export const login = async (req, res) => {
	res.json('login route');
};

// *@desc Generate a 6 digit OTP
// *@route GET /api/auth/generate-otp
// *@access public
export const generateOtp = async (req, res) => {
	res.json('generate otp route');
};

// *@desc Verify the OTP
// *@route /api/auth/verify-otp
// *@access public
export const verifyOtp = async (req, res) => {
	res.json('verify otp route');
};

// *@desc Redirect the user successfully when OTP is valid
// *@route /api/auth/create-reset-session
// *@access public
export const createResetSession = async (req, res) => {
	res.json('createResetSession route');
};

// *@desc Reset the user password
// *@route /api/auth/reset-password
// *@access private
export const resetPassword = async (req, res) => {
	res.json('ResetPassword route');
};
