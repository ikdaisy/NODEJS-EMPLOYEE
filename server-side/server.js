const http= require ("http")
const fs= require ("fs")
const url= require ("url")

const app=http.createServer((req,res)=>{
    // console.log(typeof(req.url));
    const path = url.parse(req.url)
    // console.log(path);

    if(path.pathname=="/"){
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../client-side/index.html"))
    }

    else if(path.pathname=="/css/index.css"){
        res.writeHead(200,{"Content-Type":"text/css"});
        res.end(fs.readFileSync("../client-side/css/index.css"));

    }

    
    

})

app.listen(3000)



