const mongoose =require('mongoose')
mongoose.connect(process.env.MONGODB_URI||'mongodb+srv://tyagiapp:tyagiapp@cluster0-3fzth.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var con=mongoose.connection;

con.on("connected",()=>{
    console.log("connected succesfully");
})
con.on("disconnected",()=>{
    console.log("disconnected succesfully");
})
con.on('error',()=> console.log("Database not connected internet problem"));
