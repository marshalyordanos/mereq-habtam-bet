const http = require('http')
const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config()
const server = http.createServer(app);

const PORT  = process.env.PORT || 4000

//  mongo db connection
console.log("-------")
mongoose.connect(
    process.env.LOCAL_DB
).then(()=>{
    console.log("db connection successfull!")

}).catch((err)=>{
    console.log("db connection is faild",err)
})


// listening to request
server.listen(8000,()=>{
    console.log("the server is running on port " + PORT)
})