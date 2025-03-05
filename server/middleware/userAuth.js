import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const {token}= req.cookies;
    // console.log(token)
    if(!token) {
        return res.status(401).json({success: false, message: "Hey Incruiter!, Not Authorized, Please Login first1111."});
    }
    try {
        

        //verify token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decodedToken.userId){
            req.body.userId = decodedToken.userId;
        }

        else{
            return res.status(401).json({success: false, message: "Hey Incruiter, Not Authorized, Please Login first222222."});
        }


        next();
    } 
    
    
    catch (error) {
        console.error(error);
        return res.status(401).json({success: false, message: error.message});
    }
}

export default userAuth;