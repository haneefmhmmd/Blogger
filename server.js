const  express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var userRouter = require('./Controller/routes');
//run express
const app = express();

//middleware
app.use(cookieParser());
app.use(express.json());

//connect to db

mongoose.connect('mongodb://localhost:27017/Blogger',{useNewUrlParser : true,useUnifiedTopology: true})
        .then(()=>{console.log("Connected to db")})
        .catch((err)=>{console.log(err)});    

//routing middleware
app.use('/user',userRouter);



app.listen(5000,(err)=>{
    if(err)
     console.log("Error listening to port 5000")
    console.log("Listening to port 5000");
})