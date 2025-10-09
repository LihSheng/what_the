const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

// API Routes for tools
app.post("/api/json/beautify", (req, res) => {
  try {
    const { json } = req.body;
    const parsed = JSON.parse(json);
    const beautified = JSON.stringify(parsed, null, 2);
    res.json({ result: beautified });
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON format" });
  }
});

app.post("/api/json/minify", (req, res) => {
  try {
    const { json } = req.body;
    const parsed = JSON.parse(json);
    const minified = JSON.stringify(parsed);
    res.json({ result: minified });
  } catch (error) {
    res.status(400).json({ error: "Invalid JSON format" });
  }
});

// Serve main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
