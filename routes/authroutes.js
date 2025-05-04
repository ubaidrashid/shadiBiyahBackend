import express from 'express';
const router = express.Router();
import {registerUser , loginUser , googleLogin , logoutUser} from '../controllers/authcontroller.js';

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/logout', logoutUser);

export default router;
// import express from 'express';