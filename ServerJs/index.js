const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} ${req.url} New request recived \n `;
  fs.appendFile("log.txt", log, (err, data)=>{
    switch(req.url){
      case '/' : res.end("Welcome to Home Page from server");
      break;
      case '/about' : res.end("Hello from About page This side Mustaqim");
      break;
      default : res.end("  404 Not Found!!")
      
    }
  });

  
});

myServer.listen(4500, () => console.log("server started"));
