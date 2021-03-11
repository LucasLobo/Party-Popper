import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import { SockeType } from "./contants/constant";
import { IoEvents } from "./io.events";
import path from "path";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

var clientpath = path.resolve(__dirname, "public");
app.use(express.static(clientpath));

io.on("connection", (socket: Socket) => {
  new IoEvents(io, socket);
  console.log(socket.id);
  console.log("connected");

  io.emit("Welcome to the party");
});

httpServer.listen(3000, () => {
  console.log(clientpath);
  console.log("Server listening on 3000");
});
