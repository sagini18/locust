const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: false }));

// Define a sample data array
let data = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Bob Johnson", age: 35 },
];

// GET all users
app.get("/api/users", (req, res) => {
  res.json(data);
});

// GET a single item by ID
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// POST a new item
app.post("/api/users", (req, res) => {
  const newItem = req.body;
  newItem.id = data.length + 1;
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT (update) an existing item by ID
app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  if (updatedItem.id) {
    updatedItem.id = parseInt(updatedItem.id);
  } else if (updatedItem.age) {
    updatedItem.age = parseInt(updatedItem.age);
  }

  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    res.json(data[index]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// DELETE an item by ID
app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = data.findIndex((item) => item.id === id);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
