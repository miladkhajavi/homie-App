import express from "express";
import http from 'http';
import socket from 'socket.io'
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import Router from "./router/index";
import {ConnectDataBase} from "./config/dbConfig";
import swagger from "swagger-ui-express"
import swaggerDoc from "./swagger.json"
import path from 'path';

import winston from './config/winston'

import {
  httpError
} from './middleware/response'
import realTime from './middleware/realTime'

const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app)

// socket config
const io = socket(server, {
  // cors: {
  //   origin: "http://localhost:3000",
  //   methods: ["GET", "POST"]
  // },
  'transports': ['websocket', 'polling']
})

realTime(io)

// db config
ConnectDataBase()

app.use('/homie/api-ui',swagger.serve,swagger.setup(swaggerDoc))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', express.static(path.join(__dirname, 'upload')))
// console.log(express.static(`${process.cwd()}/uploads`));

// app.use(express.static(`${process.cwd()}/upload`))

app.use(express.static(path.join(__dirname, 'dist')));;

app.use(morgan("combined",{stream:winston.stream}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// router
app.use("/", Router);



app.use((err,req, res, next) => {
  // res.render('/dist/404.html')
  res.sendFile(path.join(__dirname+'/dist/404.html'));

  // add this line to include winston logging
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  // httpError(res, 'could not find this route.', 404);
})

// ******

server.listen(port, () => console.log(`app running in port:${port}`));

export default app;