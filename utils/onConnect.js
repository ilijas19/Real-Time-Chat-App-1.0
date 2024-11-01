let socketsConnected = new Set();

function onConnect(socket, io) {
  //CONNECT
  socketsConnected.add(socket.id);
  io.emit("clients-total", socketsConnected.size);

  //DISCONNECT
  socket.on("disconnect", () => {
    socketsConnected.delete(socket.id);
    io.emit("clients-total", socketsConnected.size);
  });

  //MESSAGE
  socket.on("message", (data) => {
    socket.broadcast.emit("chat-message", data);
  });
}

module.exports = onConnect;
