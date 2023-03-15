import { Router } from 'express';
import { getUser, updateCurrentUser } from '../controllers/userControllers.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = Router();

// *@desc Get a user by name
// *@route GET /api/users/:username
// *@access PRIVATE
router.route('/:username').get(getUser);

// *@desc Update the current user profile
// *@route PATCH /api/users/update-current-user
// *@access PRIVATE
router.route('/update-current-user').patch(protectedRoute, updateCurrentUser);

export default router;
