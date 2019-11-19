const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const methodOverride = require('method-override');
const notifier = require('node-notifier');
const session = require('express-session'); 
const rateLimit = require("express-rate-limit");
const app = express();
const moviesRouter = require('./api/movies');
const request = require('superagent');
const slack = 'https://hooks.slack.com/services/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';
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, 
    message:
    "Too many requests,  please try again after an hour"
});

function errorHandler(err, req, res, next) {
    if (!err) { 
        return next(); 
    } 
    if (err) {
    const message = `Error en ${req.method} ${req.url}`;
    notifier.notify({ title: 'Error', message });
    res.status(500).send('Algo se ha roto');
    }   
}

function errorSlack(err, req, res, next) {
    if (!err) {
      return next();
    }
    const errorSlack = { text: `Error in ${req.method} ${req.url}` };
    request.post(slack)
      .send(errorSlack)
      .end(err => {
        next(err);
      });
}
app.use(apiLimiter);
app.use(express.json());//añadir estas líneas siempre
app.use(session({ secret: '1234' }));
app.use(morgan('combined'));//MORGAN nos da todos los logs por la terminal
app.use(compression());
app.use('/movies', moviesRouter);

/*
if (process.env.NODE_ENV === 'development') {
    app.use(methodOverride());
    app.use(errorHandler);
}*/

if (process.env.NODE_ENV === 'development') { 
   // app.use(methodOverride());  //ESTAS LINEAS SE COMENTAN PARA QUE PUEDA ACCEDER A LOS ERRORES DE SLACK. NO se porquqe si los mantengo
 //   app.use(errorHandler);      // no funciona. PREGUNTAR
//} else {
    app.use(errorSlack);
}


app.listen(3000, () => console.log('Ready on port 3000!'));

