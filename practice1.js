const http=require('http');

const routes=require('./routes');  //1.ye jo file vahan bnayi hai usko yahan import kr rhe hain this is called self module

const server= http.createServer(routes); //2.creating server jo routes ko access kar rha hai.
server.listen(4000,()=>{
    console.log('Request has been made');
})