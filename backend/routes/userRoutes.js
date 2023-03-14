import { Router } from 'express';

const router = Router();

// *@desc Get a user by name
// *@route GET /api/users/:username
// *@access PRIVATE
router.route('/:username').get((req, res) => res.json('hello world'));

// *@desc Update the user profile
// *@route GET /api/users/update-user
// *@access PRIVATE
router.route('/update-user').put((req, res) => res.json('hello world'));

export default router;
