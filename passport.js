var passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var User = require('./Models/User');

//user aunthentication

passport.use(new LocalStrategy((username, password,done)=>{
    User.findOne({username},(err,user)=>{
        if(err)
            return done(err);
        else if(!user)
            return done(null,false);
        user.comparePassword(password,done);
    });
}));

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies['access_token'];
    }
    return token;
};


//user Authorization

passport.use(new JWTStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "IamCule"
},(payload,done)=>{
    User.findOne({_id : payload.sub},(err,user)=>{
        if(err)
            return done(err);
        if(!user)
            return done(null, false);
        return done(null,user);
    });
}));