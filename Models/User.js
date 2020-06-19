let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({

    username : {
        type : String,
        require :true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    postsLiked : [{type : String}]
});

userSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordhash)=>{
        if(err)
            console.log("Error while hashing password" + err);
        else{
            this.password = passwordhash;
            next();
        }
    })
});

userSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        if(err)
            console.log("Error while verifying password "+err);
        else if(!isMatch)
            return cb(null,isMatch);
        return cb(null,this);
    })
}

module.exports = mongoose.model('User',userSchema);
