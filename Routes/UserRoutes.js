const express = require('express')
const router = express.Router()
const bcrypt = require("bcryptjs");
const Users = require("../Models/UserModel");


router.post("/register", (req, res) => {

    const { name, email, password ,cpassword} = req.body;
    

    // Check required fields
    if (!name || !email || !password || !cpassword) {
        return res.status(400).json({ error: "Please enter all fields" });
    }
    //Check password length
    if (password.length < 8) {
        return res.status(400).json({ error: "Password should be atleast 6 characters long" });
    }

    if(password!==cpassword){
        return res.status(400).json({ error: "Confirm Password Does Not Match" });
    }

    const findUser = Users.findOne({ email: email })
    findUser.exec((err, user) => {
        if (user) return res.status(400).json({ error: "User already exists" });

        const newUser = new Users({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })


        bcrypt.genSalt(12, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) throw err
                newUser.password = hash;

                newUser.save((err, user) => {
                    if (!err) res.json({ msg: "Successfully Registered"})

                })
            });
        });




    })
})


router.post('/login', (req, res) => {

    const { email, password } = req.body;
   

    if (!email || !password) {
        return res.status(400).json({ error: "Please Enter All Fields"})
    }

    const findUser = Users.findOne({ email: email })
   

    findUser.exec((err, user) => {

        if (!user) return res.status(400).json({ error: "User Does Not Exit"})

        
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.status(400).json({ error: "Invalid credentials"});

            const sessUser = { id: user._id, name: user.name, email: user.email }
            

            req.session.user = sessUser;  // Auto saves session data in mongo store

            res.json({ msg: "LoggedIn SuccessFully", sessUser, auth:true })
            console.log( req.session)
        })

    })

})

router.delete("/logout", (req, res) => {
   
    req.session.destroy((err) => {
       
      //delete session data from store, using sessionID in cookie
      if (err) throw err;
      res.clearCookie("connect.sid"); // clears cookie containing expired sessionID
      res.json({msg:"Logged out successfully",auth:false});
    });
  });

  router.get("/authchecker", (req, res) => {
    const sessUser = req.session.user;
    if (sessUser) {
      return res.json({ msg: " Authenticated Successfully", sessUser , auth:true });
    } else {
      return res.status(401).json({  auth:false });
    }
  });



  module.exports=router
