const express = require("express");
const app = express();
const PORT = 7500;


const {connectMongodb} = require("./Connection");
const userRouter = require("./Routes/user");

const {logReqRes} = require("./Middlewares/index");

// Connecting MongoDB
connectMongodb("mongodb://127.0.0.1:27017/testMongodb").then(() =>
  console.log("Mongodb Connected Successfully!")
);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("./Newlog.txt"));

app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`Server started at Port: ${PORT}`));


