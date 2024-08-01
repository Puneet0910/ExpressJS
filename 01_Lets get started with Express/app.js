const express = require('express');

const app = express();

app.use((req,res,next)=>{
    res.send({key : "value"});
    next();
})

app.use((req,res,next)=>{
    console.log("In second middleware");
});

app.listen(3000);