const express = require('express');
const Port = 3000;
const app = express();

app.use(express.json()) // in-built middleware

//routes
app.use("/user",require("./routes/UserRoutes"));
app.use("/admin",require("./routes/AdminRoute"));

//server
app.listen(Port, () => {
    try {
        console.log(`Server running on port ${Port}`)
    }catch(error){
        console.log(error)
    }
})