import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import UserRouter from "./routes/user.js"
import ProductRouter from "./routes/product.js"
import cookieParser from 'cookie-parser';
import { parse } from 'cookie';



const app = express()

// middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser());


// routers
app.use('/user',UserRouter)
app.use('/product',ProductRouter)

// serve static folder from backend
app.use(express.static('public'))

mongoose.connect(
    'mongodb://localhost:27017',
    {dbName:"user"}
).then(
    ()=>{
        console.log('db connected successfully')
        app.listen(5000,()=>{
            console.log("Server Started")
        })
    } 
).catch(
    (err)=>{
        console.log(err.message)
    }
)