const express = require("express");
const URL = require("./Model/url");

const urlRoute = require("./Routes/url");

const { connectMongodb } = require("./connection");

const app = express();
const PORT = 7001;

connectMongodb("mongodb://localhost:27017/short-URL")
  .then(() => console.log("Mongodb Connected Successfully!"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use(express.json());

app.use("/url", urlRoute);

app.use("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
