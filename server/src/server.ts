import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import { SockeType } from "./contants/constant";
import { IoEvents } from "./io.events";



const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {});

io.on(SockeType.CONNECTION, (socket: Socket) => {
  new IoEvents(io, socket);
});


httpServer.listen(3000, () => console.log("Server listening on 3000"));
