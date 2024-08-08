const express = require('express');

const Sequelize = require('./util/database');

const cors = require('cors');

const bodyParser = require('body-parser');

const router = require('./route/route');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);

Sequelize.sync()
.then((result) => {
    console.log(result);
        
}).catch((err) => {
    console.log(err);
    
});

app.listen(4000);