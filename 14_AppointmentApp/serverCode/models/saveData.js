const {Sequelize} = require('sequelize');

const sequelize = require('../util/database');

const appointment = sequelize.define('appointment',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    userName:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phone:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = appointment;