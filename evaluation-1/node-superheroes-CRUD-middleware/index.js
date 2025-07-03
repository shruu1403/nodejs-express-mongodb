//  do not forgot to export server
// module.exports = app;
const express=require("express")
const PORT=8080
const fs=require("fs")
const db="./db.json"
const {addID}=require("./middlewares/addID.middleware")
const {auth} =require("./middlewares/auth.middleware")
const {logger}=require("./middlewares/logger.middleware")

const app=express()
app.use(express.json())
app.use(logger)

app.post("/add/hero",addID,  (req,res)=>{
    const data = fs.readFileSync(db,"utf8")
    const parsedData=JSON.parse(data)

    parsedData.heroes.push(req.body)
    fs.writeFileSync(db,JSON.stringify(parsedData),"utf8")

    console.log(parsedData);
    res.send(parsedData.heroes)
})

app.get("/heroes",(req,res)=>{
    try {
        const data=fs.readFileSync(db,"utf-8")
        const parsedData=JSON.parse(data)
        res.send(parsedData.heroes)
    } catch (error) {
        res.send(error)
        
    }
})

app.patch("/update/villain/:hero_id",auth,(req,res)=>{
    const id=req.params.hero_id
    const {body}=req
    try {
        var data=fs.readFileSync(db,"utf-8")
        var parsedData=JSON.parse(data)
        var hero;
        parsedData.heroes.map((ele)=>{
            if(ele.id==id){
                ele.villains.push(body)
                hero=ele
                console.log(ele);
            }
        })

        let stringifyList=JSON.stringify(parsedData)
        fs.writeFileSync(db,stringifyList,"utf-8")

        res.send(hero)

    } catch (error) {
        res.send(error)
    }
})

app.delete("/delete/hero/:hero_id",auth,(req,res)=>{
    const {hero_id}=req.params
    try {
        const data=fs.readFileSync(db,"utf-8")
        const parsedData=JSON.parse(data)
        const id=Number(hero_id)
        const list=[]

        parsedData.heroes.map((ele)=>{
            if(ele.id!=id){
                list.push(ele)
            }
        })
        const updatedList={
            "heroes":list
        }
        const stringifyList=JSON.stringify(updatedList)
        fs.writeFileSync(db,stringifyList,"utf-8")
        res.send(list)
    } catch (error) {
        res.send(error)
    }

})

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
module.exports=app