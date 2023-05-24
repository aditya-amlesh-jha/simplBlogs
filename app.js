const mongoose = require("mongoose");
const express = require("express");
const app = express();
const BlogPost = require("./model/blogSchema");
const bodyParser = require("body-parser");
const port = 8000;


const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};




mongoose.connect(uri, options).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Error connecting to MongoDB', err);
});



app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get("/", (req, res) => {
  BlogPost.find()
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({error});
    });
});

app.get('/blogs/:id', async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await BlogPost.findById(blogId);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/", (req, res) => {

  const { title, author, body } = req.body;
  const newBlogPost = new BlogPost({
    title,
    author,
    body
  });

  newBlogPost.save()
    .then((blog) => {
      res.status(201).json(blog);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.delete("/blogs/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  BlogPost.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({ message: "Blog post deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});