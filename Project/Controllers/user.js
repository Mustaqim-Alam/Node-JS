const User = require("../Models/user");

//Function to create a new User
async function handleCreateUser(req, res) {
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
    return res
      .status(201)
      .json({ msg: "User created successfully!", id: result._id });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

//Function to get all  Users
async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  console.log(req.headers);
  return res.json(allUsers);
}

//Function to get user by id
async function handleGetUserByID(req, res) {
  const user = await User.findById(req.params.id);
  if (user) {
    return res.json(user);
  }
  return res.json({ status: "user not found" });
}

//Function to update user by id
async function handleUpdateUserByID(req, res) {
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
}

//Function to delete user by id
async function handleDeleteUserByID(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.status(200).json({ msg: "User deleted successfully" });
}

//Exporting all controller functions
module.exports = {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserByID,
  handleUpdateUserByID,
  handleDeleteUserByID,
};
