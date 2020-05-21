const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require('body-parser')
const UserRoutes = require("./Routes/UserRoutes")
const Agendaroutes=require('./Routes/Agenda')
const path=require('path')
const config = require("./config/key");
const postMessageRoutes = require('./Routes/PostMessageRoutes')
var cors=require('cors')

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())



// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: config.mongoURI,
    collection: "mySessions"
});


mongoDBstore.on('connected', () => console.log("mongoDBstore Connected"))
mongoDBstore.on('error', () => console.log("mongoDBstore not connected"))



app.use(
  session({
    name: config.COOKIE_NAME,
    secret: config.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // Three hours
      sameSite: false,
      secure: config.IS_PROD,
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
