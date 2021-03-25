const { response } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const jwt = require('jsonwebtoken')

const Craft = require("../models/Craft-model");
const User = require('../models/User-model');
const Comment = require ('../models/Comment-model')

function authorize(req, res, next){

    let token = req.headers['authorisation'].split(' ')[1];
    if(token != 'null'){
      jwt.verify(token, 'secret key', async(err,data)=>{
        if(!err){
          res.locals.user = data.user
          next()
        }else {console.error(err)}
      })
    }else {
      res.status(403).json({message:'Must be logged in'})
    }
  }

///////////////////////////////////
////////CREATE NEW COMMENT/////////
///////////////////////////////////
router.post("/comments", authorize, (req, res, next) => {
    
    Comment.create({
        description: req.body.description,
        craft: req.body.craftID,
        userId: res.locals.user._id
    })
    .then((response) => {
        
        console.log(response)
       
          return Craft.findByIdAndUpdate(req.body.craftID, {
              $push: { comments: response._id },
            });
      })
      .then((theResponse) => {
        res.json(theResponse);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  
///////////////////////////////////
////////RETRIEVE COMMENTS/////////
///////////////////////////////////
router.get("/crafts/:id/comments/:commentId", (req, res, next) => {
    Comment.findById(req.params.commentId)
      .then((comment) => {
        res.json(comment);
      })
      .catch((err) => {
        res.json(err);
      });
  });
  




module.exports = router;
