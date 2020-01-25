const express=require('express')
const app=express();
const path=require('path');
const dotenv=require('dotenv')

dotenv.config()

const bodyParser=require('body-parser');

// Importing database sequelize
const sequelize_master=require('./db/master connection')
const {sequelize_slave1,sequelize_slave2}=require('./db/slave connection')

// Importing Models
// const {car_master,car_slave1,car_slave2}=require('./models/car');
const {incident_master,incident_slave1,incident_slave2}=require('./models/incident');
const {victim_master,victim_slave1,victim_slave2}=require('./models/victim');
const {donor_master,donor_slave1,donor_slave2}=require('./models/donor');
const {donor_victim_master,donor_victim_slave1,donor_victim_slave2}=require('./models/donor_victim')
const temp=require('./models/temp');

// Importing routes
// const carsRoute=require('./routes/cars')
const victimRoute=require('./routes/victims')
const donorRoute=require('./routes/donors')
const incidentRoute=require('./routes/incidents')


// configure ejs template
app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))

// settings routes
// app.use('/cars',carsRoute)
app.use('/incidents',incidentRoute)
app.use('/victims',victimRoute)
app.use('/donors',donorRoute)

// creating relations 
// for master
donor_master.belongsToMany(victim_master, { through: donor_victim_master,onDelete:'cascade',hooks:true });
victim_master.belongsToMany(donor_master, { through: donor_victim_master,onDelete:'cascade',hooks:true });
incident_master.hasMany(victim_master,{onDelete:'cascade',hooks:true});

// for slave1
donor_slave1.belongsToMany(victim_slave1, { through: donor_victim_slave1,onDelete:'cascade',hooks:true });
victim_slave1.belongsToMany(donor_slave1, { through: donor_victim_slave1,onDelete:'cascade',hooks:true });
incident_slave1.hasMany(victim_slave1,{onDelete:'cascade',hooks:true});

// for slave2
// donor_slave2.belongsToMany(victim_slave2, { through: donor_victim_slave2,onDelete:'cascade',hooks:true });
// victim_slave2.belongsToMany(donor_slave2, { through: donor_victim_slave2,onDelete:'cascade',hooks:true });
// incident_slave2.hasMany(victim_slave2,{onDelete:'cascade',hooks:true});


sequelize_master
// .sync({force:true})
.sync()
.then(res=>{
    // console.log(res)
    console.log("tables created")
})
.catch(err=>{
    // console.log(err)
    console.log("error found")
})

sequelize_slave1
// .sync({force:true})
.sync()
.then(res=>{
    // console.log(res)
    console.log("tables created")
})
.catch(err=>{
    // console.log(err)
    console.log("error found")
})

// sequelize_slave2
// .sync({force:true})
// // .sync()
// .then(res=>{
//     // console.log(res)
//     console.log("tables created")
// })
// .catch(err=>{
//     // console.log(err)
//     console.log("error found")
// })

app.listen(5001,()=>{
    console.log("server has started")
})