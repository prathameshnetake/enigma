const express = require('express')
const app = express()
const path = require('path')
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const users = require('./routes/users');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')
const expressValidator = require('express-validator')


// Database connection
MongoClient.connect('mongodb://alex1992:netake1234@ds145952.mlab.com:45952/enigma', (err, db) => {
    if (err) throw err
})



// Assign public folder
app.use(express.static(path.join(__dirname, 'public')))


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Assign validator
app.use(expressValidator([]));

// setup view engins 
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use('/', routes);
app.use('/users', users);

app.listen(process.env.PORT || 8080, () => console.log("Server is running..."))
