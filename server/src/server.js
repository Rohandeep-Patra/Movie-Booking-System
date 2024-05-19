import express from 'express'
import dotenv from 'dotenv'
import connectDB from '../database/db.js'
import router from '../routes/user.route.js'



const app = express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static("public"))


connectDB()
.then(()=>{
    app.listen(process.env.PORT||8080,()=>{
        console.log(`Server is Listening on PORT ${process.env.PORT}`)
    } )
})
.catch((error)=>{
    console.log("MongoDB Connection Failed......",error)
})


app.use()