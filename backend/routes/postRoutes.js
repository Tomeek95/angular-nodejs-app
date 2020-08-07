const express = require("express");
const router = express.Router();
const PostModel = require("../models/post");

//app.post stb... uses built in middlewares
//to extract request body (incoming data) BODY_PARSER will be used
router.post("", (req, res, next) => {
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then((createdPost) => {
        res.status(201).json({
            message: "Post added successfully",
            postId: createdPost._id
        });
    });
});
// everything was okay

//the first argument is path, and the others are filters as well, but the last one is a function
//which exectues certain commands that we write in
router.get("", (req, res, next) => {
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

router.get("/:id", (req, res, next) => {
    PostModel.findById(req.params.id).then((post) => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.put("/:id", (req, res, next) => {
    const newPost = new PostModel({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    PostModel.updateOne({ _id: req.params.id }, newPost).then((result) => {
        res.status(200).json({
            message: "update was successful"
        });
    });
});

router.delete("/:id", (req, res, next) => {
    PostModel.deleteOne({ _id: req.params.id }).then((result) => {
        console.log("deleted from the database" + result);
        res.status(200).json({ message: "Post Deleted" });
    });
});

module.exports = router;
