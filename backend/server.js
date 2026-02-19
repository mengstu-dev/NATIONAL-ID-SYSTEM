const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("National ID Server Running...");
});

// Register route
app.post("/register", (req, res) => {
  const { fullName, nationalId, dateOfBirth } = req.body;

  // 1️⃣ Check empty fields
  if (!fullName || !nationalId || !dateOfBirth) {
    return res.status(400).json({
      message: "All fields are required!"
    });
  }

  // 2️⃣ Full Name validation (letters and spaces only)
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(fullName)) {
    return res.status(400).json({
      message: "Full Name must contain only letters and spaces!"
    });
  }

  // 3️⃣ National ID validation (only numbers, minimum 8 digits)
  const idRegex = /^[0-9]{8,}$/;
  if (!idRegex.test(nationalId)) {
    return res.status(400).json({
      message: "National ID must be at least 8 digits and numbers only!"
    });
  }

  // 4️⃣ Date validation
  if (isNaN(Date.parse(dateOfBirth))) {
    return res.status(400).json({
      message: "Invalid Date of Birth!"
    });
  }

  // 5️⃣ If everything is valid
  console.log("Received registration:", {
    fullName,
    nationalId,
    dateOfBirth
  });

  res.status(200).json({
    message: "Registration successful",
    data: { fullName, nationalId, dateOfBirth }
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`National ID Server Running on http://localhost:${PORT}`)
);
