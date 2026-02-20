const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/register", (req, res) => {
  const { fullName, nationalId, dateOfBirth } = req.body;
  console.log("Received registration:", { fullName, nationalId, dateOfBirth });

  if (!/^[A-Za-z ]{2,}$/.test(fullName)) {
    return res.status(400).json({ message: "Full Name must be letters only" });
  }
  if (!/^\d{8}$/.test(nationalId)) {
    return res.status(400).json({ message: "National ID must be 8 digits" });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
    return res.status(400).json({ message: "Date of Birth must be YYYY-MM-DD" });
  }

  res.json({ message: "Registration successful", data: { fullName, nationalId, dateOfBirth } });
});

app.listen(5000, () => {
  console.log("National ID Server Running on http://localhost:5000");
});
