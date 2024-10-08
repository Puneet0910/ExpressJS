const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const expense = sequelize.define('expense',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    amount:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = expense;