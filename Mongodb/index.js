const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const app = express();
const PORT = 7500;

// Built-in middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For application/json

// Connecting MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/testMongodb")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Error occurred while DB connection: " + err));

// Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    job_title: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Model
const User = mongoose.model("User", userSchema);

// Route to create a user
app.post("/api/users", async (req, res) => {
  console.log("Request Body:", req.body); // Log the request body for debugging

  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ status: "All fields are required!" });
  }

  try {
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      job_title: body.job_title,
      gender: body.gender,
    });

    console.log("Result:", result);
    return res.status(201).json({ msg: "User created successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Application middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n Req IP:${req.ip} PATH:${
      req.path
    } Date:${new Date().toISOString()} METHOD:${req.method}`,
    (err) => {
      next();
    }
  );
});

//Route to get users information
app.get("/users", async (req, res) => {
  const allDbusers = await User.find({});
  const html = `
  <ul> 
    ${allDbusers
      .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
      .join("")}
  </ul>
  `;
  return res.send(html);
});

// Route to get all Users
app.get("/allUsers", async (req, res) => {
  const allUsers = await User.find({});
  console.log(req.headers);
  return res.json(allUsers);
});

// Route to change and search information via id
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.json(user);
    }
    return res.json({ status: "user not found" });
  })
  .patch(async (req, res) => {
    const body = req.body;

    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.job_title ||
      !body.gender
    ) {
      return res.status(400).json({ status: "All fields are required!" });
    }

    await User.findByIdAndUpdate(req.params.id, { ...body });
    return res.status(200).json({ msg: "User updated successfully" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "User deleted successfully" });
  });

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));
