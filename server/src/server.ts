import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import { SockeType } from "./contants/constant";
import { IoEvents } from "./io.events";

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {
  new IoEvents(io, socket);
  console.log(socket.id);
  console.log("connected");

  io.emit("Welcome to the party");
});

httpServer.listen(3000, () => console.log("Server listening on 3000"));
