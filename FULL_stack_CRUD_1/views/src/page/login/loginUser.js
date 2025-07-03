export const loginUser=async(payload)=>{
    const data=JSON.stringify(payload)
    try {
        const response=await fetch("https://blog-app-lokh.onrender.com/user/login",{
            method:"POST",
            body:data,
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result=await response.json()
        localStorage.setItem("token",result.token)
        return result
    } catch (error) {
        console.log(error);
        return error
    }

}