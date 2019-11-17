const express = require('express');
const morgan = require('morgan');
//const session = require('express-session');//mira el nº de sessiones 
const app = express();
const moviesRouter = require('./api/movies');
app.use(express.json());//añadir estas líneas siempre

app.use(morgan('combined'));//MORGAN nos da todos los logs por la terminal
app.use('/movies', moviesRouter);


app.listen(3000, () => console.log('Ready on port 3000!'));

