import express from 'express';
import { register, login, logout, isAuthenticated, sendPasswordResetOtp, resetPassword } from '../controllers/auth.js';
import userAuth from '../middleware/userAuth.js';
import { sendVerifyOtp } from '../controllers/auth.js';
import { verifyOtp } from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
authRouter.post('/verify-account', userAuth, verifyOtp);
authRouter.get('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendPasswordResetOtp);
authRouter.post('/reset-password', resetPassword);

export default authRouter;
