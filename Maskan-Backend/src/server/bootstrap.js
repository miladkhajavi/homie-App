import {
    ConnectDataBase
  } from "../database/dbConfig";
  import * as app from "./app";

  import  globalSocket  from '../services/socketio'

const bootstrap = async() => {
    let application
    try {
        // db config
        ConnectDataBase()
        application = app.start()
    } catch (error) {
          console.error(error.message);
          process.exit(1);
    }
    new globalSocket(application)
    globalSocket.getIO()
}

module.exports =  bootstrap