import User from "../models/User.js";
import bcrypt from "bcryptjs"


export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    }catch(err) {
        return console.log(err)
    }
    if(!users) {
        return res.status(404).json({msg:"no user found"})
    }
    return res.status(200).json({users})
}

export const signUp = async (req,res,next) => {
    const { name, email, password } = req.body
    
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    }catch(err) {
        return console.log(err)
    }
    if(existingUser) {
        return res.status(400).json({msg:"user exists!please login",user:existingUser})
    }
    const hashedpassword = bcrypt.hashSync(password)
    const user = new User({
        name,
        email,
        password: hashedpassword,
        blogs:[],
    })
    
    try {
        await user.save()
    }catch(err){
        return console.log(err)
    }
    return res.status(200).json({user})

}

export const login = async (req,res,next) => {
    const { email, password } = req.body
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    }catch(err) {
        return console.log(err)
    }
    if(!existingUser) {
        return res.status(404).json({msg:"user by this email doesn`t exists!"})
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password)
    if(!isPasswordCorrect){
        res.status(400).json({msg:"password incorrect!"})
    }
    return res.status(200).json({msg:"login successfull",user:existingUser})
}

