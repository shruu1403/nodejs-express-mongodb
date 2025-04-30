//  import required modules from nodejs and build the server
const express=require("express")
const fs=require("fs")
const app=express()
const port=4500

app.use(express.json())

app.get("/",(req,res)=>{
    const data=fs.readFileSync("./db.json","utf-8")
    const parsedData=JSON.parse(data)
    res.status(200).json(parsedData.todos)  //sending only todos
})
app.post("/",(req,res)=>{
    const {id,task,status}=req.body
    if(typeof id !=="number"){
        return res.status(400).json({message:"ID must be a number"})
    }
    const data=fs.readFileSync("./db.json","utf-8")
    const parsedData=JSON.parse(data)
    parsedData.todos.push({id,task,status})
    const jsonData=JSON.stringify(parsedData)
    fs.writeFileSync("./db.json",jsonData)
    res.status(200).json(parsedData.todos)
})
app.put("/:id",(req,res)=>{
    const todoId=Number(req.params.id)
    const updatedTodo=req.body
    const data=fs.readFileSync("./db.json","utf-8")
    const parsedData=JSON.parse(data)
    const index=parsedData.todos.findIndex((todo=>todo.id===todoId))  //finding matching id through index to update that particular id's things
    if(index===-1){
        return res.status(400).send("Invalid argument")
    }
    parsedData.todos[index]={...parsedData.todos[index],...updatedTodo}
    fs.writeFileSync("./db.json",JSON.stringify(parsedData))
    res.status(200).json(parsedData.todos)
})

app.delete("/:id",(req,res)=>{
    const todoId=Number(req.params.id)
    const data=fs.readFileSync("./db.json","utf-8")
    const parsedData=JSON.parse(data)
    const index=parsedData.todos.findIndex((todo=>todo.id===todoId))
    if(index===-1){
        return res.status(400).send("Invalid argument")
    }
    parsedData.todos.splice(index,1) //delete 1 item at that index
    fs.writeFileSync("./db.json",JSON.stringify(parsedData))
    res.status(200).json(parsedData.todos)
})
app.listen(port,()=>{
    console.log(`express server is running at port ${port}`);
})

// export the server
// eg.module.exports = app;
module.exports=app