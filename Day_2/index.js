const http=require("http")
const fs=require("fs")
const server =http.createServer((req,res)=>{
    if(req.url=="/"){
        res.write("Welcome ")
        res.end("This is Homepage")
    }
    else if(req.url=="/comments"){
        res.end("This is comments section")
    }
    else if(req.url=="/users"){
        res.end("This is users data")
    }
    // else if(req.url=="/data"){
    //     fs.readFile("./data.json",(err,data)=>{
    //         if(err){
    //             res.end("something wrong happened")
    //         }
    //         else{
    //             res.end(data)
    //         }
    //     })
    // }
    else if(req.url=="/data"){
        let data=fs.createReadStream("./data.json","utf-8")
        data.pipe(res)
    }
    else if(req.url=="/letter"){
        fs.readFile("./letter.txt",(err,data)=>{
            if(err){
                res.end("something wrong happened")
            }
            else{
                res.end(data)
            }
        })
    }
    else if(req.url=="/html"){
        res.setHeader("content-type","text/html")
        res.write("<h1> This is a homepage </h1>")
        res.end()
    }
    else if(req.url=="/add" && req.method=="POST"){
        let data=""
        req.on("data",(chunk)=>{
            data+=chunk
        })
        req.on("end",()=>{
            console.log(data);
        })
        res.end("Data added")

    }
    else{
        res.end("404 not found")
    }
})
server.listen(8080,()=>{
    console.log("server is running on port 8080")
});