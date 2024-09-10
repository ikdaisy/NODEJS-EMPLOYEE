async function fetchData(){
    const res =await fetch("http://localhost:3000/getEmployee")
    console.log(res);
    
    const data= await res.json()
    console.log(data);
    str=``
    data.map((employee)=>{
        str+=`  <div>
                        
                        <tr>
                            <td><input type="text"  name="ID" disabled=true placeholder="" value=${employee.ID} id="ID-${employee.ID}">
                            </td>
                            <td><input type="text" name="name" disabled=true placeholder="" value=${employee.name} id="name-${employee.ID}"></td>
                            <td><input type="text" name="designation" disabled=true placeholder="" value=${employee.designation} id="designation-${employee.ID}"></td>
                            <td><input type="text" name="salary" disabled=true placeholder=" " value=₹${employee.salary} id="salary-${employee.ID}"></td>
                            <td><input type="text" name="experience" disabled=true placeholder="" value=${employee.experience} id="experience-${employee.ID}">
                            </td>
                            <td><div class="bonus" id="bonous-salary-${employee.ID}"> </div></td>
                            <td> <button class="edit-btn" onclick="handleEdit('${employee.ID}')" >EDIT</button>
                                <button class="save-btn" onclick="handleSave('${employee.ID}')" >SAVE</button>
                                <button class="delete-btn" onclick="handleDelete('${employee.ID}')"  >DELETE</button></td>

                        </tr>
                </div>
                        
                        
                     
                   
    `

    })
    document.getElementById("main").innerHTML=str

    let salary=0;
    data.map((employee)=>{
        // console.log(employee.experience);
        if(employee.experience==0){
        //    console.log("hehe");
           
            document.getElementById(`bonous-salary-${employee.ID}`).textContent="INELIGIBLE"
            document.getElementById(`bonous-salary-${employee.ID}`).style.color="red"
            document.getElementById(`bonous-salary-${employee.ID}`).style.fontSize=12+"px"
            document.getElementById(`bonous-salary-${employee.ID}`).style.fontWeight="bold"


        }
         else if(employee.experience==1){
            salary=parseInt(employee.salary)+(parseInt(employee.salary)*0.1)
            document.getElementById(`bonous-salary-${employee.ID}`).textContent=`₹${salary}`

        }
        else if(employee.experience==2){
            salary=parseInt(employee.salary)+(parseInt(employee.salary)*0.15)
            document.getElementById(`bonous-salary-${employee.ID}`).textContent=`₹${salary}`


        }
        else{
            salary=parseInt(employee.salary)+(parseInt(employee.salary)*0.2)
            document.getElementById(`bonous-salary-${employee.ID}`).textContent=`₹${salary}`


        }
        console.log(salary);
        console.log(employee.salary);
        
        
        
        

    });



    
}

fetchData()

//FILTER aka Search code


document.getElementById("search").addEventListener("keyup",async(e)=>{
    try{
        const res=await fetch("http://localhost:3000/getEmployee")
        const data=await res.json()
        const search =data.filter((employee)=>employee.name.toLowerCase().startsWith(e.target.value.toLowerCase()))
        console.log(data);
        console.log(search);
        
        str=``
        search.map((employee)=>{
          str+=`  <div>
                        <tr>
                            <td><input type="text"  name="ID" disabled=true placeholder="" value=${employee.ID} id="ID-${employee.ID}">
                            </td>
                            <td><input type="text" name="name" disabled=true placeholder="" value=${employee.name} id="name-${employee.ID}"></td>
                            <td><input type="text" name="designation" disabled=true placeholder="" value=${employee.designation} id="designation-${employee.ID}"></td>
                            <td><input type="text" name="salary" disabled=true placeholder=" " value=₹${employee.salary} id="salary-${employee.ID}"></td>
                            <td><input type="text" name="experience" disabled=true placeholder="" value=${employee.experience} id="experience-${employee.ID}">
                            </td>
                             <td><div class="bonus" id="bonous-salary-${employee.ID}"> </div></td>
                            <td> <button class="edit-btn" onclick="handleEdit('${employee.ID}')" >EDIT</button>
                                <button class="save-btn" onclick="handleSave('${employee.ID}')" >SAVE</button>
                                <button class="delete-btn" onclick="handleDelete('${employee.ID}')"  >DELETE</button>
                            </td>
                        </tr>
                </div>
          `

        })
        document.getElementById("main").innerHTML=str

        let salary=0;
        search.map((employee)=>{
            // console.log(employee.experience);
            if(employee.experience==0){
            document.getElementById(`bonous-salary-${employee.ID}`).textContent="INELIGIBLE"
            document.getElementById(`bonous-salary-${employee.ID}`).style.color="red"
            document.getElementById(`bonous-salary-${employee.ID}`).style.fontSize=12+"px"
            document.getElementById(`bonous-salary-${employee.ID}`).style.fontWeight="bold"
            
              
            }
             else if(employee.experience==1){
                salary=parseInt(employee.salary)+(parseInt(employee.salary)*0.1)
            document.getElementById(`bonous-salary-${employee.ID}`).textContent=`₹${salary}`

            }
            else if(employee.experience==2){
                salary=parseInt(employee.salary)+(parseInt(employee.salary)*0.15)
            document.getElementById(`bonous-salary-${employee.ID}`).textContent=`₹${salary}`

    
            }
            else{
                salary=parseInt(employee.salary)+(parseInt(employee.salary)*0.2)
                document.getElementById(`bonous-salary-${employee.ID}`).textContent=`₹${salary}`

            }
            console.log(salary);
            console.log(employee.salary);
        });
    }
   
    catch(error){
        console.log(error);
   }
});



async function handleEdit(id) {
    // console.log(id);
    // document.getElementById(`ID-${id}`).disabled=false
    document.getElementById(`name-${id}`).disabled=false
    document.getElementById(`designation-${id}`).disabled=false
    document.getElementById(`salary-${id}`).disabled=false
    document.getElementById(`experience-${id}`).disabled=false   
    
}

async function handleSave(id){
    // console.log(id);
    let name = document.getElementById(`name-${id}`).value
    let designation = document.getElementById(`designation-${id}`).value
    let salary = document.getElementById(`salary-${id}`).value
    let experience = document.getElementById(`experience-${id}`).value
    console.log(name,designation,salary,experience);
    let objData ={id,name,designation,salary,experience}
    console.log(objData);
    const jsonData=JSON.stringify(objData)
    console.log(jsonData);
    const res =await fetch("http://localhost:3000/update",{
        method:"PUT",
        "Content-Type":"text/json",
        body:jsonData
    })

    const message = await res.text()
    // console.log(message);
    res.status==200?alert(message):alert(message);
    fetchData() 
}

async function handleDelete(id){
    // console.log(id);
    if( confirm("Are you sure you want to delete this employee?")){ const res = await fetch("http://localhost:3000/delete",{
        method:"delete",
        "Content-Type":"text/plain",
        body:id
    })
    const message = await res.text()
    // console.log(message);
    res.status==200?alert(message):alert(message);
    fetchData() }
   
    
}

