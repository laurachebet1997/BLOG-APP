import Blog from "../models/Blog.js";
import mongoose from "mongoose"
import User from "../models/User.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    }catch(err) {
        return console.log(err)
    }
    if(!blogs) {
        return res.status(404).json({msg:"no blogs found"})
    }
    return res.status(200).json({blogs})
}

export const addBlog = async (req, res, next) => {
    const {title, description, image, user }=req.body
    let existingUser;
    try{
        existingUser = await User.findById(user)
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        res.status(400).json({msg:"cannot find  any user by this id"})
    }
    const blog = new Blog ({
        title, 
        description, 
        image, 
        user 
    })
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save();
        existinguser.blogs.push(blog)
        await existinguser.save({session})
        await session.commitTransaction();
    }catch(err){
        return console.log(err)
    }
    
    return res.status(200).json({blog})
}

export const updateBlog = async (req, res, next) => {
    const {title, description } = req.body
    const blogId = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId,{title,description})
    }catch(err){
        return console.log(err)
    }
    if(!blog) {
        return res.status(500).json({msg:"no blog found to be updated"})
    }
    return res.status(200).json({blog})
}

export const getById = async (req, res, next) => {
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!blog) {
        return res.status(404).json({msg:"blog not found"})
    }
    return res.status(200).json({blog})
    
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs")
    }catch(err){
        return console.log(err)
    }
    if(!userBlogs) {
        return res.status(404).json({msg:"no blogs found"})
    }
    return res.status(200).json({user:userBlogs})
    
}


export const deleteBlog = async (req, res, next) => {
    const id = req.params.id
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!blog) {
        return res.status(404).json({msg:"cannot be deleted"})
    }
    return res.status(200).json({msg:"successfully deleted"})
    
}
