const express = require('express')
var router= express.Router()
const postMessage = require('../Models/PostMessageModel')
var ObjectID = require('mongoose').Types.ObjectId      // To check id passed in put method is present in collection or not

var auth = function(req,res,next){
    const sessUser = req.session.user;
    if (sessUser) {
      next();
    } else {
        console.log("please log in")
      return res.status(401).json({  auth:false });
    }

}


router.get('/:userId', auth,(req,res)=>{

var msg = postMessage.find({"created_By":req.params.userId})
msg.exec((err,data)=>{
    if(!err)  res.send(data)
    else console.log("Error While Retreving Records")
      })
})

router.post('/:userId',auth,(req,res)=>{
    var  newRecord = new postMessage({
        title: req.body.title,
        message: req.body.message,
        created_By:req.params.userId
    })

    newRecord.save((err,data)=>
    {
        if(!err)  res.send(data)
        else console.log("Error While Inserting Records")

    })

})

router.put('/:msgId',auth ,(req,res)=>{                                     // for updation
    if(!ObjectID.isValid(req.params.msgId))
        return res.status(400).send("No Record With ID " + req.params.msgId)

        var update=postMessage.findByIdAndUpdate(req.params.msgId , {
            title: req.body.title,
            message: req.body.message
          }, {new: true})

          update.exec((err,data)=>
            {
            if(!err)  res.send(data)
            else console.log("Error While Updating Records")
            })      
})

router.delete('/:msgId',auth,(req,res)=>{
    if(!ObjectID.isValid(req.params.msgId))
        return res.status(400).send("No Record With ID " + req.params.msgId)
    
    var deleten = postMessage.findByIdAndDelete(req.params.msgId)

    deleten.exec((err,data)=>
            {
            if(!err)  res.send(data)
            else console.log("Error While Deleting Records")
            })  


})

module.exports = router
