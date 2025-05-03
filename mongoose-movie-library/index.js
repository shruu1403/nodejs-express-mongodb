const express=require("express")
const app=express()
app.use(express.json())

const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/movie-library")
const movieSchema=new mongoose.Schema({
    title:String,
    rating:Number
})

const Movie =mongoose.model("movie",movieSchema)

app.post("/movies",async(req,res)=>{
    try {
        // const movie=new Movie (req.body)
        // await movie.save()
        const movie=await Movie.insertMany(req.body);
        res.status(200)
        res.send(movie)
    } catch (error) {
        res.status(400)
        res.send(error) 
    }
})

app.get("/movies",async(req,res)=>{
    try {
        const {title,rating,q,sortBy,page=1,limit=50}=req.query
        let query={}
        if(title){
            query.title=new RegExp(title,'i') //here regexp means regular expression and i is the flag used for searching case insensitives title for movie match
        }
        if(rating){
            query.rating=rating
        }
        if(q){
            query.$or=[{title:new RegExp(q,'i')}]
        }
        const sortOptions={}
        if(sortBy){
            sortOptions[sortBy]=1  //sorting in ascending order if only sortby exists
        }
        const movies= await Movie.find(query).sort(sortOptions).skip((page-1)*limit).limit(parseInt(limit))
        res.send(movies)
    } catch (error) {
        res.status(400)
        res.send(error)
        
    }
})
app.listen(8080,()=>{
    console.log("server is running at port 8080");
})