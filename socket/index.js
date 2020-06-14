import SocketIo from "socket.io";
import eventRegister from "./event";

const socketInstance = {};

export const registerSocket = http => {
  if (socketInstance && !socketInstance.io) {
    socketInstance.io = SocketIo(http);
    socketInstance.io.on("connection", socket => {
      for (const event in eventRegister) {
        socket.on(event, eventRegister[event](socket));
      }
    });
  } else throw new Error("Duplicate socket instance");
  return;
};

export const getSocketInstance = () => {
  return socketInstance.io;
};
