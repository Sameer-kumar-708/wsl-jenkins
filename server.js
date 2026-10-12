const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js Calculator API!");
});

// Addition
app.post("/add", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({
      error: "Please provide two numbers: a and b",
    });
  }

  res.json({ operation: "addition", result: a + b });
});

// Subtraction
app.post("/subtract", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({
      error: "Please provide two numbers: a and b",
    });
  }

  res.json({ operation: "subtraction", result: a - b });
});

// Multiplication
app.post("/multiply", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({
      error: "Please provide two numbers: a and b",
    });
  }

  res.json({ operation: "multiplication", result: a * b });
});

// Division
app.post("/divide", (req, res) => {
  const { a, b } = req.body;

  if (typeof a !== "number" || typeof b !== "number") {
    return res.status(400).json({
      error: "Please provide two numbers: a and b",
    });
  }

  if (b === 0) {
    return res.status(400).json({
      error: "Cannot divide by zero",
    });
  }

  res.json({ operation: "division", result: a / b });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Calculator API running on port ${PORT}`);
});
