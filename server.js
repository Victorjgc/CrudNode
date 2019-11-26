const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const methodOverride = require("method-override");
const notifier = require("node-notifier");
const session = require("express-session");
const rateLimit = require("express-rate-limit");
const app = express();
const moviesRouter = require("./api/movies");
const cors = require("cors");
const request = require("superagent");
const corsOptions = {
  origin: ["http://localhost:3000/movies"]
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "Too many requests,  please try again after an hour"
});

//para login ?
function decodeBase64(str) {
  //mi no entender
  return Buffer.from(str, "base64").toString();
}

function authentication(req, res, next) {
  if (req.method === "GET") {
    return next();
  }
  const basicAuth = req.headers.authorization.split(" ")[1];
  const userPassword = decodeBase64(basicAuth).split(":");
  if (userPassword[0] === "Victor" && userPassword[1] === "Javier") {
    return next();
  }
  res.status(500).send("Permiso denegado");
}

app.use(request);
app.use(apiLimiter);
app.use(express.json()); //añadir estas líneas siempre
app.use(session({ secret: "1234" }));
app.use(morgan("combined")); //MORGAN nos da todos los logs por la terminal
app.use(compression());
app.use("/movies", moviesRouter);
app.use(cors(corsOptions));
app.use(authentication);
function errorHandler(err, req, res, next) {
  if (!err) {
    return next();
  }
  if (err) {
    const message = `Error en ${req.method} ${req.url}`;
    notifier.notify({ title: "Error", message });
    res.status(500).send("Algo se ha roto");
  }
}

if (process.env.NODE_ENV === "development") {
  app.use(methodOverride());
  app.use(errorHandler);
}

app.listen(3000, () => console.log("Ready on port 3000!"));
