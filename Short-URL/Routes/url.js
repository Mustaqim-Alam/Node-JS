const express = require("express");
const { handleSenerateShortID, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", handleSenerateShortID);
router.get("/analytics/:shortID" , handleGetAnalytics)

module.exports = router;
