import express from "express"
import mongoose from "mongoose"
import router from "./routes/UserRoutes.js"
import blogrouter from "./routes/BlogRoutes.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/user', router)
app.use('/api/blog', blogrouter)
// app.use('/api',(req,res) => {
//     res.send('hello world')
// })

const port = process.env.PORT || 4000
mongoose.connect(
    "mongodb+srv://laura:mongo@cluster0.u2mu8pi.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>app.listen(port,()=> console.log(`Connected to db and listening on ${port}`)))
    .catch ((er)=>console.log(er))


console.log('hi,its working!')