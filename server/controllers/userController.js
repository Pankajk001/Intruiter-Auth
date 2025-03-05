import User from "../models/user.js";

export const getUserData = async (req, res) => {
    try{
        const {userId} = req.body;

        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({success: false, message: "Hey Incruiter!, User not found"});
        }

        return res.json({
            success: true, 
            userData:{
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } 

    catch (error) {
        return res.json({success: false, message: error.message});
    }

}