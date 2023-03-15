import { Router } from 'express';
import { getUser, updateUser } from '../controllers/userControllers.js';

const router = Router();

// *@desc Get a user by name
// *@route GET /api/users/:username
// *@access PRIVATE
router.route('/:username').get(getUser);

// *@desc Update the user profile
// *@route PATCH /api/users/update-user?id="userId"
// *@access PRIVATE
router.route('/update-user').patch(updateUser);

export default router;
