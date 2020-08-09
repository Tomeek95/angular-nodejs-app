const path = require("path"); //this parses the route savely
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");
//express app is created
//this is a constant since we never do override the app
const app = express();
mongoose
    .connect(
        "mongodb+srv://Tomeek:jY7cEFBpUuvigX4@mycluster.6cmgs.mongodb.net/node-angular?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("Error occured during connecting to the database");
    });
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//any requests targeting images will have a green light
app.use("/images", express.static(path.join("backend/images")));

//correcting cors error -->
//1. Header --> this means that it does not matter which domain the apps are running on, it is allowed to get resources
//2. Header --> domains sending request with certain default headers,
//      but that way we enable other headers
//3. Header --> which http methods will be used
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
});

//this is how we make express to know that it has to use the post routes
app.use("/api/posts", postRoutes);

//this way the app and the middlewares are exported too
module.exports = app;

/*
    const posts = [
        {
            id: "fadf123123123",
            title: "First server-side post",
            content: "This post is now coming from the backend"
        },
        {
            id: "fadf123123124",
            title: "Second server-side post",
            content: "This post is also now coming from the backend"
        }
    ];*/
