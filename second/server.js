const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('MongoDB connected')) 
.catch(err=>console.log(err));

app.get('/',(req,res)=>{
    res.send('Hello from dotenv');
})

app.get("/config",(req,res)=>{
    const dbHost = process.env.DB_HOST; 
    const dbUser = process.env.DB_USER; 
    const apiKey = process.env.API_KEY;
    res.json({
        dbHost,
        dbUser,
        apiKey  
    })
})

app.use((req,res,next)=>{
    res.status(404).json({
        message: 'Route not found'
    });
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});