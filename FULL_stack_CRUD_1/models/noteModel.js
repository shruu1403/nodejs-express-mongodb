const mongoose=require("mongoose")

const noteSchema=mongoose.Schema({
    title:String,
    desc:String,
    userID:String,
    user:String
},{
    versionaKey:false
})

const noteModel=mongoose.model("note",noteSchema)

module.exports={noteModel}