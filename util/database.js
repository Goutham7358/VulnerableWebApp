const Sequelize = require('sequelize');

const sequelize = new Sequelize('xss','root','Goutham.p7358!',{
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

module.exports = sequelize;   