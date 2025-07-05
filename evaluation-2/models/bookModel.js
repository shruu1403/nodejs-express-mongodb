const mongoose=require("mongoose")

const bookSchema=mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:String,required:true},
    author:{type:String,required:true},
    publishing_year:{type:Number,required:true}
},{
    versionKey:false
})

const bookModel=mongoose.model("book",bookSchema)

module.exports={bookModel}