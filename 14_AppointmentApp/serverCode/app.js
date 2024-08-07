const express=require('express');
const app=express();

const Sequelize=require('./util/database');
const cors=require('cors');
const bodyparser=require('body-parser');


app.use(cors())
app.use(bodyparser.json())

//Routers
const route=require('./routes/route');

app.use(route);


//database conection 
Sequelize.sync()
.then(res=>console.log(res))
.catch(err=>console.log(err))




app.listen(4000,(req,res)=>{
console.log('4000 port')
})
