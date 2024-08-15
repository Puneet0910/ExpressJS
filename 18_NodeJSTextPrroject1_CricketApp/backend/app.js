const express = require('express');
const route = require('./route/playerRoute');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const app = express();

app.use(bodyParser.json({extend:false}));

app.use(cors());

app.use(route);

sequelize.sync()
.then(()=>{
    app.listen(4000)
})
.catch((error)=>console.log(error));
