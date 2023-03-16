import { Router } from 'express';
import {
	authentication,
	createResetSession,
	generateOtp,
	login,
	register,
	registerMail,
	resetPassword,
	verifyOtp,
} from '../controllers/authControllers.js';
import { checkUser, localVariables } from '../middleware/authMiddleware.js';

const router = Router();

// *@desc User authentication
// *@route POST /api/auth
// *@access public
router.route('/').post(authentication);

// *@desc Create a new account
// *@route POST /api/auth/register
// *@access PUBLIC
router.route('/register').post(register);

// *@desc Send the email
// *@route POST /api/auth/register-mail
// *@access PUBLIC
router.route('/register-mail').post(registerMail);

// *@desc Login to a user account
// *@route POST /api/auth/login
// *@access PUBLIC
router.route('/login').post(login);

// *@desc Generate a 6 digit OTP
// *@route GET /api/auth/generate-otp
// *@access public
router.route('/generate-otp').get(checkUser, localVariables, generateOtp);

// *@desc Verify the OTP
// *@route /api/auth/verify-otp
// *@access public
router.route('/verify-otp').get(checkUser, verifyOtp);

// *@desc Reset all the variables
// *@route /api/auth/create-reset-session
// *@access public
router.route('/create-reset-session').get(createResetSession);

// *@desc Reset the user password
// *@route PATCH /api/auth/reset-password
// *@access private
router.route('/reset-password').patch(checkUser, resetPassword);

export default router;
