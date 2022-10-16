const fs=require('fs'); //3. ab fs yahan hai to yahan chahiye fs module.

const array=[];
const requesthandler=(req,res)=>{  //4.ek anonymous function bna rhe hain jiski value requesthandleer mai di then isko export karenge niche.
    if(req.url==='/m')
{
        fs.readFile('message.txt', (err,data)=>{
            array.push(data);
            const parseBody1=Buffer.concat(array).toString();
            console.log(parseBody1);
            
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>')
            res.write(`<body>${parseBody1}</body>`)
            res.write('<body><form action="/message" method="POST"><input type="text" name="rinkoo"><button type="submit">SEND</button></form></body>') 
            res.write('</html>');
            return res.end();
        });

   
}
if(req.url==='/message' && req.method==="POST")
{
    const body=[];
    req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
    });
    return req.on('end',()=>{
        const parseBody=Buffer.concat(body).toString();
        console.log(parseBody);
        const message=parseBody.split('=')[1];
        fs.writeFile("message.txt",message, err=>{
            res.statusCode=302;
            res.setHeader('Location','/m');
            res.end();        
        });
        
    });
}
}


module.exports = requesthandler; //5.yahan se export kar diya hai, hamare pass 4 tareeke hain export ke.

//1. module.exports = requesthandler;

//2. module.exports={
//     handler:requestHandler,
//     sometext:'Some hard coded text'
// }
// isme hume vahan server ke ander routes.handler likhna padhega aur bahar global mai console.log(routes.sometext likhna padhega tab chalega)

//3. module.exports.handler=requesthandler;
// module.exports.sometext='some text';

//4. exports.handler=requestHandler;
// exports.sometext='some hard cord text';
//................................................
// isme hume vahan server ke ander routes.handler likhna padhega aur bahar global mai console.log(routes.sometext likhna padhega tab chalega)