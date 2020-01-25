const Sequelize=require('sequelize');

const sequelize_master=require('../db/master connection');
const {sequelize_slave1,sequelize_slave2}=require('../db/slave connection');


module.exports={
    donor_master:sequelize_master.define('donors',{
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
    donor_slave1:sequelize_slave1.define('donors',{
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
    donor_slave2:sequelize_slave2.define('donors',{
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
    })
}