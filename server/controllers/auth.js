import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    //check if name, email and password are provided
    if(!name || !email || !password){
        return res.status(400).json({success: false, message: "Hey Incruiter!, All fields are required"});
    }

    try{

        //check if user already exists
        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({success: false, message: "Hey Incruiter!, User already exists"});
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        // save user
        await user.save();

        //generate token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        //send token in HTTP cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        //sending email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Incruiter",
            html: `<h4>Hey ${name}, Welcome to Incruiter, Your account has been created successfully with email id: ${email}</h4>`,
            
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Hey Incruiter!, User registered successfully"});
        


    } 
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    //check if email and password are provided
    if(!email || !password){
        return res.status(400).json({success: false, message: "Hey Incruiter!, All fields are required"});
    }

    try{
        //find user
        const user = await User.findOne({email});

        //if user does not exist
        if(!user){
            return res.status(400).json({success: false, message: "Hey Incruiter!, Invalid email."});
        }

        //if user exists, check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Hey Incruiter!, Invalid password."});
        }

        //if password is correct, generate token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.json({success: true, message: "Hey Incruiter!, Login successful"});

    } 
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

export const logout = async (req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        });

        return res.json({success: true, message: "Hey Incruiter!, Logged Out success"});
    } 
    catch(error){
        return res.json({success: false, message: error.message});
    }
}

//send verification otp to the user's email
export const sendVerifyOtp = async (req, res) => {
    try{
        const {userId} = req.body;
        
        const user = await User.findById(userId);
        if(user.isAccountVerified){
            return res.status(400).json({success: false, message: "Hey Incruiter!, Account already verified"});
            
        }

        //generate otp
        const otp = String(Math.floor(Math.random() * 900000 + 100000));

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; //10 minutes

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Incruiter Account OTP Verification ",
            // text: `Hey ${user.name}, Your OTP for account verification is ${otp}`,
            html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Hey Incruiter!, OTP sent successfully"});
    }

    catch(error){
        return res.json({success: false, message: error.message});
    }
}

//verify email using otp
export const verifyOtp = async (req, res) => {
    const {userId, otp} = req.body;

    if(!userId || !otp){
        return res.status(400).json({success: false, message: "Hey Incruiter!, All fields are required"});
    }

    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({success: false, message: "Hey Incruiter!, User not found"});
        }

        if(user.verifyOtp === '' || user.verifyOtp !== otp ){
            return res.status(400).json({success: false, message: "Hey Incruiter!, Invalid OTP"});
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(400).json({success: false, message: "Hey Incruiter!, OTP expired"});
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: "Hey Incruiter!, Account verified successfully"});
    } 
    
    catch (error) {
        return res.json({success: false, message: error.message});
    }
}


//authentication using auth middleware
export const isAuthenticated = async (req, res) => {
    try {
        return res.json({success: true, message: "Hey Incruiter!, User authenticated"});
    } 
    catch (error) {
        return res.status(401).json({success: false, message: error.message});
    }
}

//send password reset otp
export const sendPasswordResetOtp = async (req, res) => {
    try {
        const {email} = req.body;

        if(!email){
            return res.status(400).json({success: false, message: "Hey Incruiter!, Email is required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Hey Incruiter!, User not found"});
        }

        const otp = String(Math.floor(Math.random() * 900000 + 100000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; //10 minutes

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Incruiter Password Reset OTP",
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: "Hey Incruiter!, Password reset OTP sent to Your email"});

    }

    catch (error) {
        return res.json({success: false, message: error.message});
    }

}


//reset password using otp
export const resetPassword = async (req, res) => {
    const {email, otp, newPassword} = req.body;

    if(!email || !otp || !newPassword){
        return res.status(400).json({success: false, message: "Hey Incruiter!, All fields are required"});
    }

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Hey Incruiter!, User not found"});
        }

        if(user.resetOtp === '' || user.resetOtp !== otp){
            return res.status(400).json({success: false, message: "Hey Incruiter!, Invalid OTP"});
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.status(400).json({success: false, message: "Hey Incruiter!, OTP expired"});
        }

        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = newHashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        await user.save();

        return res.json({success: true, message: "Hey Incruiter!, Password reset successful"});

    } 
    catch (error) {
        return res.json({success: false, message: error.message});
    }
}