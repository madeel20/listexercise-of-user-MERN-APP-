const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// our server is using json for sending and recieving data
app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex: true});
const connecton = mongoose.connection;
connecton.once('open',()=>{
    console.log("Mongo DB database conn established!");
})

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exerciseRouter);
app.use('/users',userRouter);

//server static assets if in production 
if(process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
})