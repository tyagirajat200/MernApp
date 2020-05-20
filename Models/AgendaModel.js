var mongoose=require('mongoose')

var Schema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    created_By:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"
    }
})

var Agenda=mongoose.model("Agenda",Schema)

module.exports=Agenda