const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const env = require('dotenv').config({})
const cors = require('cors')
const cookieParser = require("cookie-parser") ;
mongoose.connect(process.env.MONGO_DB_URL, {
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000, // 45 seconds
})
.then(() => console.log("MongoDB Connected!"))
.catch(err => console.error("MongoDB Connection Error:", err));

const authRoutes = require('./Routes/auth.route')
const userRoutes = require('./Routes/user.route')
const listingRoutes = require('./Routes/listing.route')



app.use(cookieParser())
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 

// --ROUTES 
app.use('/api/auth',authRoutes);
app.use('/api/user',userRoutes) ;
app.use('/api/listing',listingRoutes)




app.use((err,req,res,next)=>{   

    const statusCode = err.statusCode || 500 
    const message = err.message || 'Server Error' 
    
    return res.status(statusCode).json({

        success:false ,
        statusCode, 
        message 
    })



})
app.listen(process.env.PORT,()=>{

    console.log('server running ')
})