const { blogs, users } = require("../models/data");

// Create a new blog
exports.createBlog = (req, res) => {
  const { id, title, content, userId } = req.body;

  // Check if the user exists
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid user ID. User does not exist." });
  }

  // Check if the blog ID is unique
  const blogExists = blogs.some((b) => b.id === id);
  if (blogExists) {
    return res
      .status(400)
      .json({ message: "Blog ID already exists. Please use a unique ID." });
  }

  // If the ID is unique, create the blog
  blogs.push({ id, title, content, userId });
  res.status(201).json({
    message: "Blog created successfully",
    blog: { id, title, content, userId },
  });
};

// Get all blogs
exports.getBlogs = (req, res) => {
  res.json(blogs);
};

// Update a blog
exports.updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const blog = blogs.find((b) => b.id === id);

  if (blog) {
    blog.title = title;
    blog.content = content;
    res.json({ message: "Blog updated successfully", blog });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};

// Delete a blog
exports.deleteBlog = (req, res) => {
  const { id } = req.params;
  const blogIndex = blogs.findIndex((b) => b.id === id);

  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1);
    res.json({ message: "Blog deleted successfully" });
  } else {
    res.status(404).json({ message: "Blog not found" });
  }
};
