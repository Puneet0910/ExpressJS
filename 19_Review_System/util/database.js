const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('reviewdb', 'root','root',{
    dialect:'mysql',
    host:'localhost',
});

module.exports = sequelize;