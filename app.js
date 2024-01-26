const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');
const mongoose=require('mongoose');
const path=require('path');
app.use(express.urlencoded({extended:false}));
app.use(cookieParser()); // to use cookie parser
app.use(express.json()); // to use json parser and for json file to be used or to be sent in postman or database
mongoose.connect('mongodb://localhost:27017', {
    dbname:'MYBAckend_app',
}).then(()=>{console.log('MongoDB connected');}).catch((err)=>{console.log(err);});
const msgschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});
const User=mongoose.model("User",msgschema);
app.get('/',(req,res)=>{
    res.send('<h1>Hello World bro !</h1>');
});
app.get('/users/all',async(req,res)=>{
    const users=await User.find({}); // it will find all the users in the database and store it in users
    res.json({
       users,
    })
});
app.post('/users/new'  ,async(req,res)=>{
   const {name,email,password}=req.body; // data will get via postman and will be stored in name,email,password
    await User.create({
       name,email,password,
    });

    res.json({
        success:true,
        message:'User created successfully',
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});





