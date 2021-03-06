const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const users = require('./routes/users')
const bodyParser = require('body-parser')
const session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')
var server = require('http').createServer(app);
const io = require('socket.io')(server);
const OnlineUser = require('./models/onlineUsers')




mongoose.connect('mongodb://alex1992:netake1234@ds145952.mlab.com:45952/enigma', {
	useMongoClient: true
});
const db = mongoose.connection


// Assign public folder
app.use(express.static(path.join(__dirname, 'public')))


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Assign validator
app.use(expressValidator([]));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// setup view engins 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ 
	defaultLayout: 'main',
	partialsDir: "views/partials/"
}));
app.set('view engine', 'handlebars');


app.use('/', routes);
app.use('/users', users);

const logged = io.of('/');

logged.on('connection', (socket, data) => {
  console.log(socket.handshake.query.username)
  // console.log(socket.request.session)
  Online = new OnlineUser({username: socket.handshake.query.username, sessionId: socket.id})
  OnlineUser.createOnlineUser(Online)
  socket.on('chat', (data) => {
  	console.log(data)
  	io.emit('chat', data);
  })
  socket.on('disconnect', (data) => {
    console.log('socket is disconnected ' + data)
    OnlineUser.removeOnlineUser(socket.handshake.query.username, (err, data) => {
      if(err){
        throw err
      }
      console.log(data)
    })
  })
});

server.listen(process.env.PORT || 8080, () => console.log("Server is running..."))
