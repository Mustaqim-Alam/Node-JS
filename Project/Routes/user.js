const express = require("express");
const router = express.Router();

//Importing routes functions from controllers
const {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUserByID,
  handleUpdateUserByID,
  handleDeleteUserByID,
} = require("../Controllers/user");

// Route to Get And Create user depending on user requested
router.route("/").get(handleGetAllUsers).post(handleCreateUser);

// Route to change , delete and search information via id
router
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUserByID)
  .delete(handleDeleteUserByID);

module.exports = router;
