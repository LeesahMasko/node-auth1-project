const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/user_router");
const authRouter = require("../auth/router.js");

const server = express();

const sessionConfig = {
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.SECURE_COOKIE || false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: process.env.USER_ALLOWED_COOKIES || true,
  name: "monster",
  secret: process.env.COOKIE_SECRET || "keepitsecret,keepitsafe!",
};

server.use(session(sessionConfig));

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});


module.exports = server;
