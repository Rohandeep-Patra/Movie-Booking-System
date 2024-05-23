const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()
app.use(express.json())


const usersRoute = require('../routes/user.route.js')
app.use("/api/users",usersRoute)


const db = require('../database/db.js')

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`)
})