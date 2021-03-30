require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');






const app = express();


// require database configuration
require('./configs/db.config');


// Middleware Setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../frontend/build')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));








app.use(
    cors({
      // this could be multiple domains/origins, but we will allow just our React app
      origin: ['http://localhost:3000', process.env.clientURL]
    })
  );



  

// const index = require('./routes/index');
// app.use('/', index);
//      |  |  |
//      V  V  V
app.use('/', require('./routes/index.routes'));
app.use('/api', require('./routes/craft.routes'));
app.use('/api', require('./routes/step.routes'));
app.use('/api', require('./routes/file-upload.routes'));
app.use('/api', require('./routes/comment.routes'));


const authRoutes = require('./routes/auth.routes');
app.use('/api', authRoutes);


app.get('*',(req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

module.exports = app;
