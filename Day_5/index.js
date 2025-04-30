const express=require("express")
const app=express()
const fs=require("fs")

app.get("/",(req,res)=>{
    res.send("homepage")
})
app.get("/search",(req,res)=>{
    console.log(req.query);
    const {movie}=req.query
    console.log(movie);
    if(movie){
        res.send(`this is ${movie} data`)
    }
    else{
        res.send("send movie as a query")
    }
    res.send("this is your data...")
})
app.get("/search/:movie",(req,res)=>{
    console.log(req.params);
    const {movie}=req.params
    console.log(movie);
    if(movie){
        res.send(`this is ${movie} data`)
    }
    else{
        res.send("send movie as a param")
    }
    res.send("this is your data...")
})
app.get("/weather",(req,res)=>{
    const {city}=req.query
    console.log(city);
    const data=fs.readFileSync("./data.json","utf-8")
    let parseddata=JSON.parse(data)
    const temp=parseddata.cities[city]
    console.log(parseddata.cities[city]);
    res.send(`temperature is ${temp} in ${city}`)

})
app.get("/weather/:city",(req,res)=>{
    const {city}=req.params
    console.log(city);
    const data=fs.readFileSync("./data.json","utf-8")
    let parseddata=JSON.parse(data)
    const temp=parseddata.cities[city]
    console.log(parseddata.cities[city]);
    res.send(`temperature is ${temp} in ${city}`)

})

app.listen(8080,()=>{
    console.log("express server is running at port 8080");
})