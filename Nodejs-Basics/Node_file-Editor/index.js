const fs = require("fs");
const path = require("path");

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4];
console.log(process.argv);

function readFile(file){
  const data=fs.readFileSync(file , {encoding:"utf-8"} , (err)=>{
    if(err){
      console.log(err);
    }
  })
  console.log(data);
}
function appendFile(file){
  fs.appendFileSync(file,`\n${content}`,{encoding:"utf-8"},(err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(`Content appended to ${file}`);
    }
  })
}
function deleteFile(file){
  fs.rm(file,(err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(`File ${file} deleted`);
    }
  })
}
function createFile(file){
  fs.writeFileSync(file,"",{encoding:"utf-8"},(err)=>{
    if(err){
    console.log(err);
    }
    else{
      console.log(`File ${file} created`);
    }
  })
}
function renameFile(oldFile , newFile){
  fs.renameSync(oldFile , newFile , (err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(`File ${oldFile} renamed to ${newFile}`);
    }
  })

}
function listDir(path){
  const files=fs.readdirSync(path , {encoding:"utf-8"}, (err)=>{
    if(err){
      console.log(err);
    }
  })
  console.log(files);
}
switch (operation) {
  // complete the fillowing function.
  case "read":
    readFile(file)
    break

  case "append":
    appendFile(file,content)
    break

  case "delete":
    deleteFile(file)
    break

  case "create":
    createFile(file)
    break

  case "rename":
    renameFile(file,content)
    break

  case "list":
    listDir(file)
    break
    
  default:
    console.log(`Invalid operation '${operation}'`);
}
