require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
// Packages
const cookieParser = require("cookie-parser");
const path = require("path");
// DB connection
const connectDb = require("./db/connectDb");
// Middlewares
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
// Routers
const authRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
//SOCKETS
const { calculateOnline, handleMessages } = require("./socket.io/socket");

// Middleware setup
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/", chatRouter);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  await connectDb(process.env.MONGO_URI);

  const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

  const io = require("socket.io")(server);
  calculateOnline(io);
  handleMessages(io);
};

start();
