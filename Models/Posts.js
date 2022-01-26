let mongoose = require('mongoose');
let postSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    author :{
        type: String,
        required: true
    }, 
    body :{
        type : String,
        required : true
    }, 
    likes :{
        type : Number
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Posts',postSchema);