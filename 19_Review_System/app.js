const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const route = require('./routes/route');

const sequelize = require('./util/database');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());
app.use(route);

sequelize.sync()
.then((result) => {
    console.log('Port started');
    app.listen(4000)
    
}).catch((err) => {
    console.log(err);
});

