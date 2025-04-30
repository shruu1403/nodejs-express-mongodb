const ramukaka=(req,res,next)=>{
    let card=true
    if(card){
        console.log("You can enter school by permission of ramukaka");
        next()
        console.log("ramukaka says bye chunnu");
    }
    else{
        res.send("you need an id card")
    }
}
module.exports={ramukaka}