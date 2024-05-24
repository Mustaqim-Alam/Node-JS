const shortid = require("shortid");
const URL = require("../Model/url");

async function handleSenerateShortID(req, res) {
  const body = req.body;
  const shortID = shortid();
  if (!body.url) return res.status(400).json({ message: "Url is required!!" });

  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortID = req.params.shortID;
  const result = await URL.findOne({ shortID });
  if (!result) return res.status(404).json({ message: "Short url not found " });

  return res.json({
    totalclicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleSenerateShortID,
  handleGetAnalytics,
};
