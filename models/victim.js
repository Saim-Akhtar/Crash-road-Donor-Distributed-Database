const Sequelize=require('sequelize');

const sequelize_master=require('../db/master connection');
const {sequelize_slave1,sequelize_slave2}=require('../db/slave connection');

module.exports={
    victim_master:sequelize_master.define('victims',{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        key:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    }),
    victim_slave1:sequelize_slave1.define('victims',{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        key:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    }),
    victim_slave2:sequelize_slave2.define('victims',{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        key:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    }),
}