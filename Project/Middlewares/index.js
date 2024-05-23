const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n Req IP:${req.ip} PATH:${
        req.path
      } Date:${new Date().getTime()} METHOD:${req.method}`,
      (err, data) => {
        next();
      }
    );
  };
}

module.exports = { logReqRes };
