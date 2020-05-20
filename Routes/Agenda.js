const express = require('express')
var router= express.Router()

var Agenda=require("../Models/AgendaModel")


var auth = function(req,res,next){
    const sessUser = req.session.user;
    if (sessUser) {
      next();
    } else {
        console.log("please log in")
      return res.status(401).json({  auth:false });
    }

}

router.get('/getEvents',auth,(req,res)=>{

var id=req.session.user.id

var events=Agenda.find({"created_By":id})
events.exec((err,data)=>{
    if(!err)  res.send(data)
    else console.log("Error While Retreving Records")
      })


})

router.post('/addEvents',auth,(req,res)=>{
    var  newRecord = new Agenda({
       title:req.body.title,
       time:req.body.time,
       location:req.body.location,
       description:req.body.description,
       created_By:req.session.user.id
    })
    
    newRecord.save((err,data)=>
    {
        if(!err)  {
          res.send(data)
        }
        else console.log("Error While Inserting Records")

    })

})

router.delete('/:eventId',auth,(req,res)=>{

    var deleten = Agenda.findByIdAndDelete(req.params.eventId)

    deleten.exec((err,data)=>
            {
            if(!err)  {
              res.send(data)
             
            }
            else console.log("Error While Deleting Records")
            })  


})

module.exports=router