// import required modules
const express=require("express")
const app=express()
const multer=require("multer")
const PORT=8080
app.use(express.json())

const storage=multer.diskStorage({
    destination:function(req,file,cb){   //where to save the uploaded file
        cb(null,"uploads/")             //cb means callback
    },
    filename:function(req,file,cb){      //what name to save the file with
        cb(null,`${file.originalname}`)
    }
})
const upload =multer({storage:storage})     //upload now becomes a middleware

app.get("/",(req,res)=>{
     res.status(200).send({message:"welcome to server"})
})
app.post("/upload",upload.single('avatar'),async(req,res)=>{
    res.status(200).send({message:"file uploaded successfully"})

})
app.listen(PORT,()=>{
    console.log(`express server is running at port ${PORT}`);
})

// export the server
// eg.module.exports = app;
module.exports=app
