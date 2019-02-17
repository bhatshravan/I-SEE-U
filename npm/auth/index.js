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

//Connect to mongodb
const MongoDb = process.env.MONGODB_URI || config.mongodb_url;
mongoose.connect(MongoDb, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'MongoDb connection error'));

console.log('Successfully connected to MongoDb on url: '+config.mongodb_url);


//Use CORS
app.use(cors());
app.options('*',cors());

//BodyParser and logger with morgan
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serve static files from template
app.use(express.static('auth/views/DoubleHelix'));

//Set up a render engine which is ejs
app.engine('html', require('ejs').renderFile);
app.set('views', 'auth/views');
app.set('view engine', 'ejs');

//Set up session and cookie parser
app.use(cookieParser());
app.use(session({secret: config.session_secret }));

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

//Add sessions
app.use(session({
    secret: config.secret,
    resave: true,
    saveUnintialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
}))

//Start server
app.listen(8081, function(){
  console.log("Started server at: "+config.PORT);
  console.log("----------\nLogging start\n----------\n\n");
});
