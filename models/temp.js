const Sequelize=require('sequelize');

const sequelize_master=require('../db/master connection');

const temp=sequelize_master.define('temp',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    key:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    // operation:{
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    inslaves:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
    
})


module.exports=temp;