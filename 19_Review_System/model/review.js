const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const review = sequelize.define('review',{
    name:{
        type: Sequelize.STRING,
        allowNull:false,
        primaryKey:true,
    },
    pros:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    cons:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    rating:{
        type:Sequelize.INTEGER, 
        allowNull:false,
    },
});

module.exports = review;