const mongoose =require('mongoose')
var schema=new mongoose.Schema({
    title:{type: String},

    message:{type: String},

    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }

    })

var postMessage=mongoose.model('postMessage',schema);

module.exports = postMessage