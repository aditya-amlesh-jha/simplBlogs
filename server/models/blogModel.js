const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    body: {
        type: String,
        required: true,
        minlength: 3,
    },
    author_id: {
        type: String,
        required: true,
    },
    blogImage: {
        type: String,
        required: true,
    }
},{timestamps: true});


blogSchema.statics.createBlog = async function(title,body,author_id,blogImage){
    if(!title || !body || !author_id){
        throw Error("Missing fields");
    }
    const blog = await this.create({
        title,
        body,
        author_id,
        blogImage
    })
}

blogSchema.statics.getBlogById = async function(blog_id){
    if(!blog_id){
        throw Error("Missing fields");
    }
    const blog = await this.findOne({_id:blog_id});
    return blog;
}

blogSchema.statics.getBlogByAuthor = async function(author_id){
    if(!author_id){
        throw Error("Missing fields");
    }
    const blogs = await this.find({author_id:author_id});
    return blogs;
}

blogSchema.statics.updateBlog = async function(blog_id,title,body,blogImage){
    if(!blog_id || !title || !body){
        throw Error("Missing fields");
    }
    const blog = await this.findById(blog_id);
    blog.title = title;
    blog.body = body;
    console.log(blog);
    if(blogImage){
        blog.blogImage = blogImage;
    }
    blog.save();
}

blogSchema.statics.deleteBlog = async function(blog_id){
    if(!blog_id){
        throw Error("Missing fields");
    }
    const blog = await this.findById(blog_id);
    await this.findByIdAndDelete(blog_id);
}



const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;