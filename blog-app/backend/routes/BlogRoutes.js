import express from "express"
import { addBlog, getAllBlogs, updateBlog, deleteBlog, getById, getByUserId} from "../controllers/BlogControllers.js"


const blogrouter = express.Router()

blogrouter.get('/', getAllBlogs)
blogrouter.post('/add', addBlog)
blogrouter.put('/update/:id', updateBlog)
blogrouter.get('/:id', getById)
blogrouter.post('/:id', deleteBlog)
blogrouter.get('/user/:id', getByUserId )



export default blogrouter;