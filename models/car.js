const Sequelize=require('sequelize');

const sequelize_master=require('../db/master connection');
const {sequelize_slave1,sequelize_slave2}=require('../db/slave connection');

const car_master=sequelize_master.define('cars',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    model:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

const car_slave1=sequelize_slave1.define('cars',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    model:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.STRING,
        allowNull: false
    }

})

const car_slave2=sequelize_slave2.define('cars',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    model:{
        type: Sequelize.STRING,
        allowNull: false
    },
    year:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports={car_master,car_slave1,car_slave2};