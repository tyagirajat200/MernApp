const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://tyagiapp:tyagiapp@cluster0-3fzth.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var con=mongoose.connection;

con.on("connected",()=>{
    console.log("connected succesfully");
})
con.on("disconnected",()=>{
    console.log("disconnected succesfully");
})
con.on('error',()=> console.log("Database not connected internet problem"));


const Users = require("./Models/UserModel");
const postMessage = require('./Models/PostMessageModel')

postMessage.find({})
.populate('created_By',{'password':0, '_id':0 , 'date':0, '__v':0})
.select({ "title" :1 ,"_id":0})          // or select can be select("title message -_id")
.exec((error,data)=>{
console.log(data)

})