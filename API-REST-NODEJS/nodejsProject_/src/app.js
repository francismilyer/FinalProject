//Modules
const express = require('express');
const morgan = require('morgan');

//Import Roles
const createRol = require('./libs/automaticSetup');

//Import Routes 
const activities = require('./routes/act.routes');
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');

//Inicializar 
const app = express();
createRol();

//Middleware 
app.use(morgan('dev'));
app.use(express.json());

//Routes
//Actividades 
app.use('/activities', activities);
//Auth
app.use('/auth', auth);
//User
app.use('/user', user);

//Export
module.exports = app;