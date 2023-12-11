const express = require('express');
const Port = 3000;

const app = express();

app.listen(Port,()=>{
    console.log(`Server running on port ${Port}`)
})