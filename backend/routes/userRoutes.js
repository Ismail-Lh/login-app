import { Router } from 'express';
import { getUser, updateUser } from '../controllers/userControllers.js';

const router = Router();

// *@desc Get a user by name
// *@route GET /api/users/:username
// *@access PRIVATE
router.route('/:username').get(getUser);

// *@desc Update the user profile
// *@route GET /api/users/update-user
// *@access PRIVATE
router.route('/update-user').put(updateUser);

export default router;
