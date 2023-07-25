const Blog = require("../models/blogModel");


module.exports.createBlog = async (req,res)=>{
    const {title,body} = req.body;

    // image
    const blogImage = req.file.path;

    const author_id = req._id;

    try{
        const blog = await Blog.createBlog(title,body,author_id,blogImage);
        res.status(200).json({message: "Blog created"});
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
}

module.exports.getBlogById = async (req,res)=>{
    const {blog_id} = req.params;

    try{
        const blog = await Blog.getBlogById(blog_id);
        res.status(200).json({blog});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports.getBlogByAuthor = async (req,res)=>{
    const author_id = req._id;

    try{
        const blogs = await Blog.getBlogByAuthor(author_id);
        res.status(200).json({blogs});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports.updateBlog = async (req,res)=>{
    const {blog_id} = req.params;
    const {title,body} = req.body;
    const blogImage = req.file.path;


    try{
        await Blog.updateBlog(blog_id,title,body,blogImage);
        res.status(200).json({message: "Blog updated"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports.deleteBlog = async (req,res)=>{
    const {blog_id} = req.params;
    try{
        await Blog.deleteBlog(blog_id);
        res.status(200).json({message: "Blog deleted"});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

module.exports.getAllBlogs = async (req,res)=>{
    try{
        const blogs = await Blog.find({});
        res.status(200).json({blogs});
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}

// search by title
module.exports.searchBlog = async (req, res) => {

    const { title } = req.query; // Use req.query instead of req.body
    console.log(title)

    try {
        const blogs = await Blog.find({ title: { $regex: new RegExp(title, "i") } });
        res.status(200).json({ blogs });
    }catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports.getImage = async (req,res)=>{
    const {imageName} = req.params;
    // fetch from ../upload/imageName and send it
    try{
        res.status(200).sendFile(`${process.cwd()}/uploads/${imageName}`);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}