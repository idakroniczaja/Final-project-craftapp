const express    = require('express');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken')

 

 
// require the user model !!!!
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





 authRoutes.post('/logMeIn', (req, res)=>{
   //  console.log('i am', req.body, 'headers', req.headers)
   
     User.findOne({email: req.body.email})
     .then((user)=>{
        //console.log(user) 
         jwt.sign({user},'secret key', {expiresIn:'30min'}, (err, token)=>{
             res.json({user, token})

         if (!user){
             User.create(req.body)
         }
     }
     )
   })
 })




 authRoutes.get('/user', authorize, (req, res, next)=>{
    //console.log(req.headers['authorisation'].split(' ')[1])
    //  let token = req.headers['authorisation'].split(' ')[1];
    //  jwt.verify(token, 'secret key', async(err,data)=>{
         //console.log(data)
         User.findById(res.locals.user._id)
         .then(user=>{
             console.log(user)
             res.json(user)
         }).catch(console.error)
    //  })
 })

module.exports = authRoutes;