const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const db = require('./db')
const UserRoutes = require("./Routes/UserRoutes")
const Agendaroutes=require('./Routes/Agenda')
require("dotenv").config()
const path=require('path')


const postMessageRoutes = require('./Routes/PostMessageRoutes')
var cors=require('cors')



// parse application/json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGODB_URI||"mongodb+srv://tyagiapp:tyagiapp@cluster0-3fzth.mongodb.net/test?retryWrites=true&w=majority",
    collection: "mySessions"
});


mongoDBstore.on('connected', () => console.log("mongoDBstore Connected"))
mongoDBstore.on('error', () => console.log("mongoDBstore not connected"))



app.use(
  session({
    secret: "SESS_SECRET",
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // Three hours
      sameSite: false,
      secure: false,
    }
  })
);



const PORT = process.env.PORT || 4000


 const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

 app.use(cors(corsOptions))




if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,'client','build','index.html'))
  })
}

app.use("/user", UserRoutes)
app.use("/postmessages", postMessageRoutes)
app.use("/agenda",Agendaroutes)



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
