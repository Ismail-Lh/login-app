import { Router } from 'express';

const router = Router();

// *@desc User authentication
// *@route POST /api/auth
// *@access public
router.route('/').post((req, res) => res.json('hello world'));

// *@desc Create a new account
// *@route POST /api/auth/register
// *@access PUBLIC
router.route('/register').post((req, res) => res.json('hello world'));

// *@desc Send the email
// *@route POST /api/auth/register-mail
// *@access PUBLIC
router.route('/register-mail').post((req, res) => res.json('hello world'));

// *@desc Login to a user account
// *@route POST /api/auth/login
// *@access PUBLIC
router.route('/login').post((req, res) => res.json('hello world'));

// *@desc Generate a 6 digit OTP
// *@route GET /api/auth/generate-otp
// *@access public
router.route('/generate-otp').get((req, res) => res.json('hello world'));

// *@desc Verify the OTP
// *@route /api/auth/verify-otp
// *@access public
router.route('/verify-otp').get((req, res) => res.json('hello world'));

// *@desc Reset all the variables
// *@route /api/auth/create-reset-session
// *@access public
router
	.route('/create-reset-session')
	.get((req, res) => res.json('hello world'));

// *@desc Reset the user password
// *@route /api/auth/reset-password
// *@access private
router
	.route('/create-reset-session')
	.put((req, res) => res.json('hello world'));

export default router;
