const Sequelize=require('sequelize');

const sequelize_master=require('../db/master connection');
const {sequelize_slave1,sequelize_slave2}=require('../db/slave connection');

module.exports={
    incident_master:sequelize_master.define('incident',{
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
        location:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }),
    incident_slave1:sequelize_slave1.define('incident',{
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
        location:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }),
    incident_slave2:sequelize_slave2.define('incident',{
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
        location:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        date:{
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }),
}