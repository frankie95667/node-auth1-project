const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');

const userRouter = require("../users/user-router");
const authRouter = require("../auth/auth-router");
const restrictedRouter = require("../auth/restrictedRouter");

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session({
    secret: "keyboard cat",
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
    },
    resave: false,
    saveUninitialized: true
}))

server.use("/api/users", restrictedRouter, userRouter);
server.use("/api", authRouter);

module.exports = server;