const cors = require('cors');
const express = require('express');
const path = require('path');
require('dotenv').config();
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const morgan = require('morgan');
const conect = require('./database');

//Initialiazations
const app = express();
require('./database');
conect();
app.use(cors())
app.use(morgan('tiny'));

//Settings
app.set('port', process.env.PORT || 3000);

app.use(express.json());
//Global Variables

//Routes
app.use(require('./routes/Index'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});