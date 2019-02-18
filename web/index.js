const config  =  require('./config.js');
const router = require('./routes/Routes.js');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const multer = require('multer');
var upload = multer();

//Connect to mongodb
const MongoDb = process.env.MONGODB_URI || config.mongodb_url;
mongoose.connect(MongoDb, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDb connection error'));


console.log("\n\n----------\nLogging start with new starts\n----------\n");
console.log('\MongoDB connected: '+config.mongodb_url);


//Use CORS
app.use(cors());
app.options('*',cors());

//BodyParser and logger with morgan
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array());

// serve static files from template
app.use(express.static('views/public'));

//Set up a render engine which is ejs
app.engine('html', require('ejs').renderFile);
app.set('views', 'views');
app.set('view engine', 'ejs');

//Set up cookie parser
app.use(cookieParser());

//Add sessions
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
}));

//Log all body requests
app.use(function (req, res, next) {
  console.log('[Body request]: '+req.body); // populated!

  res.locals.userEmail = req.session.userEmail;
  res.locals.userId = req.session.userId;
  next();
})

//Enable cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

//Start router
router(app);

//Start server
app.listen(8081, function(){
    console.log("Started server at: "+config.PORT+"  \n\n");
});
