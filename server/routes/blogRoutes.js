const express = require("express");
const router = express.Router();
const blogControllers = require("../controllers/blogControllers");
const authVerify = require("../middleware/authVerify");
const multer = require("multer");
const path = require("path");

// multer

// crop image to 600*400


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "uploads");
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}

const upload = multer({
    storage: storage,
    limits:{

        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});



// delete,update,create,getByAuthor will require middleware authVerify.js

router.post("/create",upload.single("image"),authVerify,blogControllers.createBlog);
router.get("/getByAuthor",authVerify,blogControllers.getBlogByAuthor);
router.put("/update/:blog_id",upload.single("image"),authVerify,blogControllers.updateBlog);
router.delete("/delete/:blog_id",authVerify,blogControllers.deleteBlog);

// get, getall will not require middleware authVerify.js

router.get("/getall",blogControllers.getAllBlogs);
router.get("/get/:blog_id",blogControllers.getBlogById);
router.get("/uploads/:imageName",blogControllers.getImage);
router.get("/search/",blogControllers.searchBlog)


module.exports = router;