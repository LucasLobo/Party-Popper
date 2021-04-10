import socketIOClient from "socket.io-client";

export const socket = socketIOClient(
  "https://party-popper-backend.herokuapp.com/",
  {
    transports: ["websocket"],
  }
);
