let connectedSockets = new Set();
const calculateOnline = (io) => {
  io.on("connection", (socket) => {
    // console.log("Socket connected", socket.id);

    connectedSockets.add(socket.id);
    io.emit("clients-total", connectedSockets.size);

    socket.on("disconnect", () => {
      // console.log("Socket disconnected", socket.id);

      connectedSockets.delete(socket.id);
      io.emit("clients-total", connectedSockets.size);
    });
  });
};

const handleMessages = (io) => {
  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      socket.broadcast.emit("chat-message", data);
    });
  });
};

module.exports = {
  calculateOnline,
  handleMessages,
};
