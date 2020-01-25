const Sequelize=require('sequelize');

const sequelize_master=require('../db/master connection');
const {sequelize_slave1,sequelize_slave2}=require('../db/slave connection');


module.exports={
    donor_victim_master:sequelize_master.define('donor_victim',{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        amount:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        key:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    }),
    donor_victim_slave1:sequelize_slave1.define('donor_victim',{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        amount:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        key:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    }),
    donor_victim_slave2:sequelize_slave2.define('donor_victim',{
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        amount:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        key:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    })
}