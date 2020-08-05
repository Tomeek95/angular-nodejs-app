const express = require("express");

//express app is created
//this is a constant since we never do override the app
const app = express();

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

//the first argument is path, and the others are filters as well, but the last one is a function
//which exectues certain commands that we write in
app.use("/api/posts", (req, res, next) => {
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
    ];
    //last statement will be returned so we do not have to return it
    res.status(200).json({
        message: "posts fetched successfully!",
        posts: posts
    });
});

//this way the app and the middlewares are exported too
module.exports = app;
