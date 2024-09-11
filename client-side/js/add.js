 async function displayErrorMessage(){
    const res=await fetch("http://localhost:3000/getEmployee")
    // console.log(res);
    const data =await res.json()
    // console.log(data);
    document.getElementById("ID").addEventListener("keyup",async (e)=>{
        const enteredID= e.target.value.toUpperCase()
        console.log(enteredID)
        const existingData=data.find((employee)=>{
            // console.log(employee.ID);
            // console.log(e.target.value);
            
            
            return employee.ID===enteredID
        })
        //find method returns undefined if there's no match 
        //undefined value is same as false 
        // console.log(exisitingData);

        errorMessageElement=document.getElementById("errorMessage");
        if (existingData) {
            errorMessageElement.textContent = "ID already exists!";
            errorMessageElement.style.display = "block";
            errorMessageElement.style.color="red"
            errorMessageElement.style.fontWeight = "bold";
            errorMessageElement.style.fontSize = 12+"px";

           document.getElementById("add-btn").disabled=true;
           document.getElementById("add-btn").style.backgroundColor="rgb(136,244,180)";



          } else {
            errorMessageElement.textContent = "";
            errorMessageElement.style.display = "none";
           document.getElementById("add-btn").style.backgroundColor="#037961";
           document.getElementById("add-btn").disabled=false;

          }
            
    });
 }

 displayErrorMessage();
