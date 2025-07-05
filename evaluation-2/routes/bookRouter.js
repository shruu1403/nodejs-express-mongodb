const express=require("express")
const {bookModel}=require("../models/bookModel")
const {auth}=require("../middlewares/auth.middleware")
const {rateLimit}=require("../middlewares/rateLimit.middleware")

const bookRouter=express.Router()

bookRouter.use(rateLimit)

bookRouter.get("/",auth,async(req,res)=>{
    try {
        const books=await bookModel.find()
        res.status(200).send(books)
        
    } catch (error) {
        res.status(400).send({error:error.message})
        
    }
})

bookRouter.post("/create",auth,async(req,res)=>{
    const {title,author,genre,publishing_year}=req.body
    try {
        const book= new bookModel({title,author,genre,publishing_year})
        await book.save()
        console.log("oyee:",book);
        res.status(200).send({"msg":"Book added" , "added book":book})
        
    } catch (error) {
        console.log("hahha:",error);
        res.status(400).send({error:error.message})
        
        
    }
})

bookRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const book=await bookModel.findByIdAndUpdate({_id:id},req.body)
        if(book){
            res.status(200).send({"msg":"book has been updated"})

        }else{
            res.status(200).send({"msg":"book not found"})
        }
        
    } catch (error) {
        res.status(400).send({error:error.message})
        
    }
})

bookRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
        const book =await bookModel.findByIdAndDelete(id)
        if(book){
            res.status(200).send({"msg":"book has been deleted"})
        }else{
            res.status(200).send({"msg":"book not found"})
        }
        
    } catch (error) {
        res.status(400).send({error:error.message})
        
    }
})

module.exports={bookRouter}


