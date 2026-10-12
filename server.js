
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Node.js Calculator API!",
    endpoints: [
      "/add?a=10&b=5",
      "/subtract?a=10&b=5",
      "/multiply?a=10&b=5",
      "/divide?a=10&b=5"
    ]
  });
});

function getNumbers(req, res) {
  const { a, b } = req.query;

  if (
    a === undefined ||
    b === undefined ||
    a.trim() === "" ||
    b.trim() === "" ||
    !Number.isFinite(Number(a)) ||
    !Number.isFinite(Number(b))
  ) {
    res.status(400).json({
      error: "Please provide valid numbers a and b."
    });
    return null;
  }

  return { a: Number(a), b: Number(b) };
}

app.get("/add", (req, res) => {
  const n = getNumbers(req, res);
  if (!n) return;
  res.json({ result: n.a + n.b });
});

app.get("/subtract", (req, res) => {
  const n = getNumbers(req, res);
  if (!n) return;
  res.json({ result: n.a - n.b });
});

app.get("/multiply", (req, res) => {
  const n = getNumbers(req, res);
  if (!n) return;
  res.json({ result: n.a * n.b });
});

app.get("/divide", (req, res) => {
  const n = getNumbers(req, res);
  if (!n) return;

  if (n.b === 0) {
    return res.status(400).json({
      error: "Cannot divide by zero."
    });
  }

  res.json({ result: n.a / n.b });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Calculator API running on port ${PORT}`);
});
