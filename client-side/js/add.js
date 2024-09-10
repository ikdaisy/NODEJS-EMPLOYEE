alert("hello")

document.getElementById("ID").addEventListener("keyup",async (e)=>{
    console.log(e.target.value);
    const res=await fetch("http://localhost:3000/getEmployee")
    // console.log(res);
    const data =await res.json()
    // console.log(data);
    // let search=data.find(){
    //     return e.target.value == "data.ID"
    //     alert("Already exist")
    // }
    
    

  

    

})