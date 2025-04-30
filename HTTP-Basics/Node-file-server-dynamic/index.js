//  import required modules from nodejs
const http = require("http");
const fs = require("fs");
const path = require("path");
// create the server
const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url); //building absolute path by combining current directory and req url

  if (fs.existsSync(filePath)) {
    //check if path exists
    if (fs.statSync(filePath).isDirectory()) {
      //check if path is a folder
      const directoryListingList = directoryListing(filePath); //calling function to get html for folder contents
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(directoryListingList);
    } else {
      //check if its a file
      const fileContents = fs.readFileSync(filePath, "utf-8"); //utf 8 ensures it is a readable text
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(fileContents);
    }
  } else {
    //if path doesnt exists
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

//function
const directoryListing = (directoryPath) => {
  //absolute path to the folder we want to list
  const allFiles = fs.readdirSync(directoryPath); //reads content of the folder
  let listing = "<ul>"; //building html list

  allFiles.map((file) => {
    //loop through each file/folder inside directory
    const filePath = path.join(directoryPath, file); //full path of file/folder
    const isDirectory = fs.statSync(filePath).isDirectory(); //check if its folder or not and statsync gives details about file
    const unicodeIcon = isDirectory ? "&#128193;" : "&#128441;"; //folder / file icon rendering

    listing += `<li>${unicodeIcon} <a href ="${file}">${file}</a></li>`; //clickable link using href
  });
  listing += "</ul>";
  return listing; //returning final html string...string sent as response to browser
};

server.listen(8080, () => {
  console.log(`Server is running at port 8080`);
});

// export the server
module.exports = server;
