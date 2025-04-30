const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 7700;

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url);

  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isDirectory()) {
      const directoryListingList = directoryListing(filePath);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(directoryListingList);
    } else {
      const fileContents = fs.readFileSync(filePath, "utf-8");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(fileContents);
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

//function
const directoryListing = (directoryPath) => {
  const allFiles = fs.readdirSync(directoryPath);
  let listing = '<ul>';
  allFiles.map((files) => {
    listing += `<li><a href="${files}">${files}</a></li>`;
  });
  listing += '</ul>';
  return listing;
};

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
// export your server
module.exports = server;
