import React, { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      content,
    };

    axios
      .post("/api/posts", newBlog)
      .then((res) => {
        console.log("Blog added successfully:", res.data);
        // Reset the form fields
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.log("Error adding blog:", error);
      });
  };

  return (
    <div>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;