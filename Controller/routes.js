var express = require('express');
var userRouter = express.Router();
var passport = require('passport');
var passportConfig = require('../passport');
var User = require('../Models/User');
var Post = require('../Models/Posts');
var JWT = require('jsonwebtoken');

const signToken = userID =>{
    return JWT.sign({
        iss : "Haneef Muhammad",
        sub : userID
    },"IamCule",{expiresIn : "1h"});
};

userRouter.post('/register',(req, res)=>{
    const {username, password,email} = req.body;
    User.findOne({$or: [{username},{email}]},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody :"Error has occured", msgError : true}});
        else if(user){
            if(user.username==username && user.email==email)
                res.status(400).json({message : {msgBody :"Username and Email Already Exists", msgError : true}});
            else if (user.username==username)
                res.status(400).json({message : {msgBody :"Username Already Exists", msgError : true}});
            else if (user.email==email)
                res.status(400).json({message : {msgBody :"Email Already Exists", msgError : true}});
        }else {
            const newUser = new User({username, password,email});
            newUser.save((err, document)=>{
                if(err)
                    res.status(400).json({message : {msgBody :"Error while creating user "+err, msgError : true}});
                else
                    res.status(201).json({message : {msgBody :"User Created Successfully!", msgError : false}});    
            });
        }
    });
});

userRouter.post('/login',passport.authenticate('local',{session:false}),(req, res)=>{
    if(req.isAuthenticated()){
        const user = req.user;
        const {_id} = req.user;
        const token = signToken(_id);
        const cookie = res.cookie('access_token',token,{httpOnly : true, sameSite : true});
        res.status(201).json({isAuthenticated:true,user});
    }
});

userRouter.get('/logout', passport.authenticate('jwt',{session:false}),(req, res)=>{
    res.clearCookie('access_token');
    res.status(201).json({success:true, user: {username : "",email: ""}, message: "Logged out Successfully", isAuthenticated: false});
});

userRouter.post('/create', passport.authenticate('jwt',{session : false}), (req, res)=>{
    const username = req.user.username;
    const post = req.body;
    post.author = username;
    const newPost = new Post(post);
    newPost.save()
           .then(document => res.status(201).json({document,isSuccessful : true}))
           .catch(err => res.status(400).json({message : {msgBody :"Error while creating post "+err, msgError : true}}));
});


userRouter.post('/update/:id', passport.authenticate('jwt',{session: false}), (req, res)=>{
    // const author = req.user.username;
    Post.findOneAndUpdate({_id : req.params.id},req.body,{new:true})
        .then(document => res.status(201).json({isSuccessful:true}))
        .catch(err => res.status(400).json({message : {msgBody :"Error while updating "+err, msgError : true}}))
});


userRouter.delete('/delete/:id', passport.authenticate('jwt',{session :false}), (req, res)=>{
    const author = req.user.username;
    Post.findOneAndDelete({author, _id : req.params.id})
        .then(doc => res.status(200).json({isSuccessful:true}))
        .catch(err => res.status(400).json({delete : "Error while deleting"}));
});

userRouter.get('/posts', passport.authenticate('jwt',{session :false}), (req, res)=>{
    Post.find({author : req.user.username})
        .then(document => res.status(201).json(document))
        .catch(err => res.status(400).json({message : {msgBody :"Error while retrieving posts "+err, msgError : true}}))
});


userRouter.get('/allposts', (req, res)=>{
    Post.find({}).sort({"title":1}).limit(10)
        .then(document => res.status(201).json(document))
        .catch(err => res.status(400).json({message : {msgBody :"Error while retrieving posts "+err, msgError : true}}))
});


userRouter.get('/post/:id',(req, res)=>{
    Post.find({_id: req.params.id})
        .then(document => res.status(201).json(document[0]))
        .catch(err => res.status(400).json({message : {msgBody :"Error while retrieving posts "+err, msgError : true}}))
});

userRouter.get('/post/:author', passport.authenticate('jwt',{session :false}), (req, res)=>{
    Post.find({author : req.params.author})
        .then(document => res.status(201).json(document))
        .catch(err => res.status(400).json({message : {msgBody :"Error while retrieving posts "+err, msgError : true}}))
});

userRouter.get('/authenticated',passport.authenticate('jwt',{session : false}),(req, res)=>{
    const {username, email} = req.user;
    res.status(201).json({user:{username, email}, isAuthenticated : true});
});


userRouter.post('/postsliked/:id', passport.authenticate('jwt',{session: false}), (req,res)=>{
    const postsliked = req.params.id;
    const {username} = req.user;
    req.user.postsLiked.push(postsliked);
    User.findOneAndUpdate({username},req.user,{new:true})
        .then(() => res.status(201).json({isSuccessful:true}))
        .catch(err => res.status(400).json({message : {msgBody :"Error while updating postsliked in db"+err, msgError : true}}))
});

userRouter.post('/unlikepost/:id', passport.authenticate('jwt',{session: false}), (req,res)=>{
    const postId = req.params.id;
    const {username} = req.user;
    let index = req.user.postsLiked.indexOf(postId);
    if(index>-1){
        req.user.postsLiked.splice(index, 1);
    }
    User.findOneAndUpdate({username},req.user,{new:true})
        .then(() => res.status(201).json({isSuccessful:true}))
        .catch(err => res.status(400).json({message : {msgBody :"Error while updating postsliked in db"+err, msgError : true}}))
});

userRouter.get('/isliked/:id', passport.authenticate('jwt',{session: false}), (req,res)=>{
    const postId = req.params.id;
    if(req.user.postsLiked.some(likedPostsId=> likedPostsId===postId)){
        res.status(201).json({isLiked : true});
    }
    else res.status(201).json({isLiked : false});

});

module.exports = userRouter;