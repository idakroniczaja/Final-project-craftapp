const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken')
 
const Craft = require('../models/Craft-model');
const Step = require('../models/Step-model');
const User = require('../models/User-model');



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
  ////////GET ALL CRAFTS/////////
  ///////////////////////////////////
  router.get('/crafts', (req, res, next) => {
    Craft.find()
    .populate('steps')
    .populate('comments')
    .then(craftsFromDB => {
    
      res.json(craftsFromDB)
    })
    .catch(err => res.json(err));
  });
  
  ///////////////////////////////////
  ////////GET my CRAFTS/////////
  ///////////////////////////////////
  
  router.get('/myCrafts', authorize, (req, res, next) => {
   
  // let token = req.headers['authorisation'].split(' ')[1];
   
    //jwt.verify(token, 'secret key', async (err,data)=>{
  Craft.find({userId : res.locals.user._id})
  .then(allCrafts=>{
    res.json(allCrafts)
  })
 //  })
  });

///////////////////////////////////
////////CREATE A NEW CRAFT/////////
///////////////////////////////////
router.post('/crafts/create', authorize, (req, res, next) => {

   const { title, description, imageUrl} = req.body;
//console.log(req.headers)
  // let token = req.headers['authorisation'].split(' ')[1];
  // console.log(token)
 
  //jwt.verify(token, 'secret key', async(err,data)=>{
    Craft.create({
      title,
      description,
      imageUrl,
      steps: [],
      comments: [],
      userId: res.locals.user._id,
    })
    .then(createdCraft => {
      console.log(res.locals.user)
      // console.log(createdCraft)
      res.status(200).json(createdCraft);
    })
    .catch(err => {
      res.json(err);
    });
 //})

});




///////////////////////////////////
////////UPDATE CRAFT/////////
///////////////////////////////////
router.put('/crafts/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Craft.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.json({ message: `Craft with ${req.params.id} is updated successfully.` });
  })
  .catch(error => {
    res.json(error);
  });
});

///////////////////////////////////
////////DELETE CRAFT/////////
///////////////////////////////////
router.delete('/crafts/:id', authorize, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  
  Craft.findByIdAndRemove(req.params.id)
  .then(() => {
    res.json({ message: `Craft with ${req.params.id} is removed successfully.` });
  })
  .catch(error => {
    res.json(error);
  });
});



///////////////////////////////////
////////GET CRAFT DETAILS/////////
///////////////////////////////////
router.get('/crafts/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  Craft.findById(req.params.id)
    .populate('steps')
    .populate('comments')
    .then(craft => {
      res.status(200).json(craft);
    })
    .catch(error => {
      res.json(error);
    });
});





module.exports = router;