// import {
//     Auth
// } from "../middleware/passport";
// import Reservation from '../models/reservation';

import { Server } from "socket.io";

let io;

class globalSocket {
  constructor(httpServer) {
    this.httpsServer = httpServer;
    this.initSocket();
  }

  initSocket() {
    io =
      process.env.NODE_ENV === "production"
        ? require("socket.io")(this.httpsServer, { serveClient: false })
        : new Server(this.httpsServer, { path: "/socket.io/global" });

    io.on("connection", (socket) => {
      socket.on("room", async (room) => {
        socket.join(room);
      });
    });
  }

  static getIO() {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    console.log(io);
    console.info("socket initialized");
    return io;
  }
}

module.exports =  globalSocket ;

