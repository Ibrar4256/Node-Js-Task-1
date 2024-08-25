const { users } = require("../models/data");

exports.createUser = (req, res) => {
  const { id, name, email } = req.body;

  // Check if the user ID is unique
  const userExists = users.some((u) => u.id === id);
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User ID already exists. Please use a unique ID." });
  }

  // If the ID is unique, create the user
  users.push({ id, name, email });
  res
    .status(201)
    .json({ message: "User created successfully", user: { id, name, email } });
};

// Get all users
exports.getUsers = (req, res) => {
  res.json(users);
};

// Update a user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((u) => u.id === id);

  if (user) {
    user.name = name;
    user.email = email;
    res.json({ message: "User updated successfully", user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Delete a user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
