const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
 
const Craft = require('../models/Craft-model');
const Step = require('../models/Step-model');

///////////////////////////////////
////////GET ALL CRAFTS/////////
///////////////////////////////////
router.get('/crafts', (req, res, next) => {
  Craft.find()
  .populate('steps')
    .then(craftsFromDB => {
      console.log(craftsFromDB)
      res.json(craftsFromDB)
    })
    .catch(err => res.json(err));
});
 
///////////////////////////////////
////////CREATE A NEW CRAFT/////////
///////////////////////////////////
router.post('/crafts/create', (req, res, next) => {
 

  Craft.create(req.body)
    .then(createdCraft => {
      res.status(200).json(createdCraft);
    })
    .catch(err => {
      res.json(err);
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
 
  // Our projects have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  Craft.findById(req.params.id)
    .populate('tasks')
    .then(craft => {
      res.status(200).json(craft);
    })
    .catch(error => {
      res.json(error);
    });
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
router.delete('/crafts/:id', (req, res, next) => {
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





module.exports = router;