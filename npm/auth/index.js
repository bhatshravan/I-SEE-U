const config  =  require('./config.js');
const Routes = require('./routes/Routes.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Connect to mongodb
const MongoDb = process.env.MONGODB_URI || config.mongodb_url;
mongoose.connect(MongoDb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDb connection error'));

console.log('Successfully connected to MongoDb on url: '+config.mongodb_url);
