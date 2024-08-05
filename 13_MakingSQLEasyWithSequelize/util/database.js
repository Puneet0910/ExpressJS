const Sequilize = require('sequelize');

const sequelize = new Sequilize('nodejs','root','root', {dialect:'mysql', host:'localhost'});


module.exports = sequelize;