const mongoose = require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    pass:{type:Number,required:true}
},{
    versionKey:false
})
const UserModel=mongoose.model("user",userSchema)
module.exports={UserModel}