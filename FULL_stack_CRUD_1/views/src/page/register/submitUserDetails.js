export const submitUserDetails=async(payload)=>{
    const data=JSON.stringify(payload)
    try {
        const response=await fetch("http://localhost:8080/user/register",{
            method:"POST",
            body:data,
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result=await response.json()
        return result
    } catch (error) {
        console.log(error);
        return error
    }
}