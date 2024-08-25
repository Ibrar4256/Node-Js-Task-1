const { blogs } = require("../models/data");

const accessControl = (req, res, next) => {
  const userId = req.headers["user-id"];
  const { id } = req.params;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }

  if (blog.userId !== userId) {
    return res
      .status(403)
      .json({ message: "Access denied. You are not the owner of this blog." });
  }

  next();
};

module.exports = accessControl;
