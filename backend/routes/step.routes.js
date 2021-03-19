const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
 
const Craft = require('../models/Craft-model');
const Step = require('../models/Step-model');

///////////////////////////////////
////////RETRIEVE STEPS/////////
///////////////////////////////////
router.get('/crafts/:id/steps/:stepId', (req, res, next)=>{
   Step.findById(req.params.stepId)
   .then(step=>{
       res.json(step);
   })
   .catch(err=>{
       res.json(err);
   });
});

///////////////////////////////////
////////CREATE NEW STEP/////////
///////////////////////////////////
router.post('/steps', (req, res, next)=>{

    Step.create({
        title: req.body.title,
        description: req.body.description,
        craft:req.body.craftID
    })
    .then(res=>{
        return Craft.findByIdAndUpdate(req.body.craftID, {
            $push: {tasks: response._id}
        });
    })
    .then (theResponse => {
        res.json(theResponse)
    })
    .catch(err=>{
        res.json(err)
    })
});

///////////////////////////////////
////////UPDATE  STEP/////////
///////////////////////////////////
router.put('/steps/:id', (req, res, next)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }


      Step.findByIdAndUpdate(req.params.id, req.body)
      .then(()=>{
          res.json({message:`Step with ${req.params.id} is updated successfully.`})
      })
      .catch(err=>{
          res.json(err)
      })
});

///////////////////////////////////
////////DELETE  STEP/////////
///////////////////////////////////
router.delete('/steps/:id', (req, res, next)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }
      Step.findByIdAndDelete(req.params.id)
      .then(()=>{
          res.json({message:`Step with ${req.params.id} is removed successfully.`})
      })
      .catch(err=> {
          res.json(err)
      });
})


module.exports = router;