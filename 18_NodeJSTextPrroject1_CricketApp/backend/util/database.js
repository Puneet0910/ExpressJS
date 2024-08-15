const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('player_info', 'root','root',{
    dialect:'mysql',
    host:'localhost',
});

module.exports = sequelize;