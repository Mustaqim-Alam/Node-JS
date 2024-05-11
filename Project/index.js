const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 3500;

// Built in middleware
app.use(express.urlencoded({ extended: false }));

// Application middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n Req IP:${req.ip} PATH:${req.path} Date:${new Date().getTime()} METHOD:${
      req.method
    }`,
    (err, data) => {
      next();
    }
  );
});

app.use((req, res, next) => {
  console.log("Hello from middleware 2");
  next();
});

app.get("/users", (req, res) => {
  const html = ` 
  <ul> 
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>
  `;

  return res.send(html);
});

app.get("/api/users", (req, res) => {
  console.log(req.headers);
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      id: users.length + 1,
      Stats: "Data Pushed successfully",
    });
  });

  // return res.json({status : "success" });
});

app
  .route("/api/users/:id") //One
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
      return res.json(user);
    }
    return res.json({ status: "user not found" });
  })
  //Edit user with id via Patch method
  .patch((req, res) => {
    const id = Number(req.params.id);
    let userData = users.findIndex((user) => user.id === id);
    users[userData] = { ...users[userData], ...req.body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.json({ status: "User not updated" });
      }
      return res.json({
        Status: "Sucessfully edit data from ",
        id: userData.id,
      });
    });
  })
  // Delet user from database with id
  .delete((req, res) => {
    const id = Number(req.params.id);
    const user = users.filter((user) => user.id !== id);
    if (user.length === users.length) {
      return res.json({ Status: "User Not Found To Delete" });
    }

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(user), (err, data) => {
      return res.json({ Status: "User Deleted Seccessfully!" });
    });
  });
app.listen(PORT, () => console.log(`Server started at Port : ${PORT}`));
