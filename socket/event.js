import {} from "./handler";

export default {
  disconnect: socket => {
    console.log(`${socket.id} disconnected!`);
  }
};
