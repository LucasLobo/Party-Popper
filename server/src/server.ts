import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import { SockeType } from "./contants/constant";
import { IoEvents } from "./io.events";

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer);
io.setMaxListeners(200);

io.on(SockeType.CONNECTION, (socket: Socket) => {
  new IoEvents(io, socket);
  console.log("player", socket.id);
});

httpServer.listen(8000, () => console.log("Server listening on 8000"));
