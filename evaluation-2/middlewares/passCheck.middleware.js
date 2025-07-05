const specialchar="!@#$&*"
const upperchar="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const passCheck=(req,res,next)=>{
    const {pass}=req.body

    var numcheck=false
    var specialcharcheck=false
    var uppercheck=false

    for(let j=0;j<pass.length;j++){
        let element=Number(pass[j])
        if(Number(element)){
            numcheck=true
        }

        for(let i=0;i<specialchar.length;i++){
            if(pass[j]===specialchar[i]){
                specialcharcheck=true
                break
            }
        }
        for(let i=0;i<upperchar.length;i++){
            if(pass[j]===upperchar[i]){
                uppercheck=true
                break
            }
        }
    }
    if(!numcheck || !uppercheck || !specialcharcheck || pass.length <8){
        res.send({"msg":"password should be atleast 8 character long and contain one special char , one number , one upper case letter."})
    }else{
        next()
    }
}
module.exports={passCheck}