const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url} New request recived \n `;
  const myUrl = url.parse(req.url , true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("Welcome to Home Page from server");
        break;
      case "/about":
        const username = myUrl.query.userName;
        res.end(`Hello, ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_name;
        res.end(`You are searching for ${search}`);
        break;
      default:
        res.end("  404 Not Found!!");
    }
  });
});

myServer.listen(4500, () => console.log("server started"));
