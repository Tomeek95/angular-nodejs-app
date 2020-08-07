const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const PostModel = require("./models/post");
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

//app.post stb... uses built in middlewares
//to extract request body (incoming data) BODY_PARSER will be used
app.post("/api/posts", (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then((result) => {
        console.log(result);
        res.status(201).json({
            message: "Post added successfully",
            postId: result._id
        });
    });
});
// everything was okay

//the first argument is path, and the others are filters as well, but the last one is a function
//which exectues certain commands that we write in
app.get("/api/posts", (req, res, next) => {
    PostModel.find().then((documents) => {
        console.log(documents);
        res.status(200).json({
            message: "posts fetched successfully!",
            posts: documents
        });
    });

    //last statement will be returned so we do not have to return it
    /**/
});

app.delete("/api/posts/:id", (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("deleted from the database");
        res.status(200).json({ message: "Post Deleted" });
    });
});

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
