const http= require ("http")
const fs= require ("fs")
const url= require ("url")
const queryString= require("querystring")
const {MongoClient,ObjectId}=require ("mongodb")

const PORT=3000;

const client=  new MongoClient("mongodb://127.0.0.1:27017/")




const app=http.createServer(async(req,res)=>{
    // console.log(typeof(req.url));
    const path = url.parse(req.url)

    console.log(path);
     //create database
     const db = client.db("Employee")
     //create collection
     const collection =db.collection("staff")

    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"))
    }

    else if(path.pathname=="/client-side/css/index.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/index.css"));

    }
    else if(path.pathname=="/client-side/js/index.js"){
        res.writeHead(200,{"Content-Type":"text/js"});
        res.end(fs.readFileSync("../client-side/js/index.js"));

    }
    else if(path.pathname=="/add"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/pages/add.html"));

    }
    else if(path.pathname=="/css/add.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/add.css"));

    }
    console.log(req.method);

    //add Data
    if(path.pathname=="/submit" && req.method=="POST")  {
       let body=""
        req.on("data",(chunk)=>{
            console.log(chunk);
            body+=chunk.toString();
            console.log(body);
        });
        req.on("end",async()=>{
            if(body!=null){
                const formData=queryString.parse(body)
                console.log(formData);
                // console.log(formData.ID);
                const existingData=await collection.findOne({ID:formData.ID})
                if(existingData){
                    console.log("Data with ID already exists");
                   
                }
                else{
                    collection.insertOne(formData).then(()=>{
                        console.log("Success");
                        
                    }).catch((error)=>{
                        console.log(error);
                        
                    })    

                }
                 
            }
        })
        // redirect the page into homepage after submitting
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"))

    }  
    //get data from database and  send to the frontend

    if(path.pathname=="/getEmployee" && req.method=="GET"){
        const data = await collection.find().toArray()
        console.log(data);
        const jsonData=JSON.stringify(data)
        console.log(jsonData);
        res.writeHead(200,{"Content-Type":"text/json"});
        res.end(jsonData)
        
    }

    //save
    if(path.pathname=="/update" && req.method=="PUT"){
        console.log("Update route reached");
        body=""
        req.on("data",(chunk)=>{
            console.log(chunk);
            body+=chunk.toString()
            console.log(body);
        });
        req.on("end",async()=>{
            let udata = JSON.parse(body)
            console.log(udata);
            const updateData= {name:udata.name,designation:udata.designation,salary:udata.salary,experience:udata.experience}
            let ID=udata.id;
            console.log(ID);
            
            await collection.updateOne({ID},{$set:updateData})

            .then(()=>{
                res.writeHead(200,{"Content-Type":"text/html"})
                res.end("Updated Successfully")
            }).catch(()=>{
                res.writeHead(404,{"Content-Type":"text/html"})
                res.end("Failed to update")
            })
        })
        
    }

    //delete
    if(path.pathname=="/delete" && req.method=="DELETE"){
        console.log("You reached the delete route");

        body=""
        req.on("data",(chunk)=>{
            console.log(chunk);
            body+=chunk.toString()
            console.log(body);
        });
        req.on("end",async()=>{
           
            let ID=body;
            collection.deleteOne({ID})
            .then(()=>{
                res.writeHead(200,{"Content-Type":"text/html"})
                res.end("Deleted Successfully")
            }).catch(()=>{
                res.writeHead(404,{"Content-Type":"text/html"})
                res.end("Failed to delete")
            })
        })
    }


})

client.connect().then(()=>{
    console.log("Database Connected");
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
        

    })

    
}).catch((error)=>{
        console.log(error);
        
    })



