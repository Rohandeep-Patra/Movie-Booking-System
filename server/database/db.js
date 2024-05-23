const mongoose = require ('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGO_URL)

const connection = mongoose.connection

connection.on('connected',() =>{
    console.log('MongoDB connected')
})

connection.on('error',()=>{
    console.log('MongoDB connection failed')
})