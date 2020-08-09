const express = require("express");
//multer - file uploader package
const multer = require("multer");
//multer gives us automatically the mimetype of the file (that was needed to be done manually on the frontend)
//this is a helper constant
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};
//destination has 3 arguments:
//  - request
//  -file that we want to upload
//  -a callback function, where we need to specify the error message, and the relative path
//          to the server.js
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-");
        const fileExtension = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + fileExtension);
    }
});

const router = express.Router();
const PostModel = require("../models/post");

//app.post stb... uses built in middlewares
//middlewares are executing arguments(functions) in the order they are placed
//    multer(storage).single("image") ==> multer will try to use the storage prop
//    (that has to be sent as a json object)to find out what is the location,
//    the name of the file and then that it is a single file and
//    it will try to find it in the image property of the request body
//to extract request body (incoming data) BODY_PARSER will be used
router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const post = new PostModel({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename
    });
    post.save().then((createdPost) => {
        res.status(201).json({
            message: "Post added successfully",
            post: {
                id: createdPost._id,
                title: createdPost.title,
                content: createdPost.content,
                imagePath: createdPost.imagePath
            }
            /*thi is a next gen js feature, we give the whole object, and then override one existing one
              ...createdPost,
              id: createdPost._id
            */
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

router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const newPost = new PostModel({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
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
