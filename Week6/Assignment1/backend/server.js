const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// GET all users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST add new user
app.post("/users", (req, res) => {
  const user = req.body;
  user.id = Date.now(); // Add unique ID
  users.push(user);
  res.json({ message: "User added successfully", user });
});

// PUT update user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const userIndex = users.findIndex(user => user.id == id);

  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    res.json({ message: "User updated successfully", user: users[userIndex] });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id == id);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.json({ message: "User deleted successfully", user: deletedUser[0] });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/users", (req, res) => {
  res.json(users);
});

// POST user
app.post("/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json({ message: "User added", user });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
