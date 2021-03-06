// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var _ = require('underscore');

//Change to use different collections in the DB
var collName = "WeekendTest";

var Schema       = mongoose.Schema;

var pollSchema   = new Schema({
    sessionId: String,
    order: [String],
    a1: String,
    a2: String,
    a3: String,
    a4: String,
    a5: String
});

var offlineSchema = new Schema({
    orders: [pollSchema]
})

var Answer = mongoose.model(collName, pollSchema);
var Answers = mongoose.model('Answers', offlineSchema);

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port

try {
    mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
}
catch (e) {
    throw "cannot connect to DB!"
}


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./app/routes')(app,express,Answer,Answers,_); // pass our application into our routes


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);
app.use('/loaderio-e51d983e12088e99b8363200d9951c40', verification1);
app.use('/loaderio-030daa52cd49ac4bdd9c28037a26a098', verification2);



// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app

//TODO: uptime plugins, unit tests? scaling via changing collectionId, cronjob for db duplication keyvalue store for collection names