const express=require("express")
const bookRoutes=express.Router()
const {BookModel} =require("../models/bookModel")
const validator=require("../middleware/validator")

bookRoutes.get("/",async(req,res)=>{
    try {
        const books=await BookModel.find()
        res.send(books)
    } catch (error) {
        res.send(error)
        
    }

})

bookRoutes.use("/add",validator)
bookRoutes.post("/add",async(req,res)=>{
    const data=req.body
    try {
        const books=new BookModel(data)
        await books.save()
        res.send("new book has been added  successfully")
    } catch (error) {
        res.send(error)
        
    }
})

bookRoutes.get("/search",async(req,res)=>{
    const q=req.query
    try {
        const books=await BookModel.find(q)
        res.send(books)
    } catch (error) {
        res.send(error)
    }
})

bookRoutes.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    const data=req.body
    try {
        await BookModel.findByIdAndUpdate({_id:id},data)
        res.send("book details have been updated successfully")
    } catch (error) {
        res.send(error)
    }
})
bookRoutes.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try {
        await BookModel.findByIdAndDelete({_id:id})
        res.send("book has been deleted")
    } catch (error) {
        res.send(error)
    }
})

module.exports={bookRoutes}