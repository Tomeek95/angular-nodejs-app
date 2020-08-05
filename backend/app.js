const express = require("express");

//express app is created
//this is a constant since we never do override the app
const app = express();

app.use((req, res, next) => {
    console.log("First Middleware!");
    next();
});

app.use((req, res, next) => {
    res.send("Hello from Express!");
});

//this way the app and the middlewares are exported too
module.exports = app;
