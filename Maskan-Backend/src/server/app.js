import express from "express";
import http from 'http';
import socket from 'socket.io'
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import Router from "../router/index";
import path from 'path';
import winston from '../config/winston'

const port = process.env.PORT || 3000;

let application;

function start() {
  const app = express();
  const server = http.createServer(app)


  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  

  app.use('/', express.static(path.join(__dirname, 'upload')))
  app.use(express.static(path.join(__dirname, 'dist')));;
  app.use(morgan("combined", {
    stream: winston.stream
  }));
  app.use(express.json({ }));
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());

  
  // router
  app.use("/", Router);
  app.use((err, req, res, next) => {
    // res.render('/dist/404.html')
    res.sendFile(path.join(__dirname + '/dist/404.html'));
  
    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // httpError(res, 'could not find this route.', 404);
  })
  
  application = server.listen(port, 'localhost', () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('---------------------------------------------------------');
      console.log(' ');
      console.log(` Server is listening on port ${port}`);
      console.log(' ');
      console.log('---------------------------------------------------------');
    }
  });

  return application;
}

function close() {
  application.close();
}

module.exports = {
  start,
  close
};
