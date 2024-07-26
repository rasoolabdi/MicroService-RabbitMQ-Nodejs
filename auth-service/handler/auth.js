const userModel = require("../model/user");
const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");



authRouter.post("/register" , async(req,res,next) => {
    try{
        const {name , email , password} = req.body;
        const existUser = await userModel.findOne({email});
        if(existUser) throw new Error("user already exist");
        const newUser = new userModel({
            name,
            email,
            password,
        });
        await newUser.save();
        return res.json({
            message: "newUser Created Successfully"
        })
    }
    catch(error) {
        next(error);
    }
})

authRouter.post("/login" , async (req,res,next) => {
    try{
        const {email , password} = req.body;
        const existUser = await userModel.findOne({email})
        if(!existUser) throw {message: "NotFound User"};
        if(existUser.password !== password) throw {message: "password incorrect"};
        delete existUser.password;
        jwt.sign({email , userID: existUser._id , name: existUser.name} , "secretKey" , (error, token) => {
            if(!error) return res.json({token});
            return res.json({error: error.message});
        })
    }
    catch(error) {
        next(error);
    }
}) 

module.exports = {
    authRouter
}

