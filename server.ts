import * as express from 'express';
import * as morgan from  'morgan';
import * as compression from  'compression';
import * as methodOverride from  'method-override';
import * as notifier from  'node-notifier';
import * as session from  'express-session';
import * as rateLimit from  "express-rate-limit";
import * as moviesRouter from  './src/api/movies';
import * as cors from  'cors';

const app   = express();
const corsOptions = {//¿?
    origin: ['http://localhost:3000/movies']
};

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message:
        "Too many requests,  please try again after an 15 min"
});
app.use(cors(corsOptions));
app.use(apiLimiter);
app.use(express.json());//añadir estas líneas siempre
app.use(session({ secret: '1234' }));
app.use(morgan('combined'));//MORGAN nos da todos los logs por la terminal
app.use(compression());
app.use('/movies', moviesRouter);
app.use(cors(corsOptions));

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

if (process.env.NODE_ENV === 'development') {
    app.use(methodOverride());
    app.use(errorHandler);
}

app.listen(3000, () => console.log('Ready on port 3000!'));