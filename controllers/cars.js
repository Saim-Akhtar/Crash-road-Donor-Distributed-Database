const {car_master,car_slave1,car_slave2}=require('../models/car');
const car_temp=require('../models/temp');

const verifyRow=async()=>{
    try {
        const res= await car_temp.destroy({
            where: {
                inUser1: true
            }
        })
        if(res){
            console.log("successfully deleted")
        }
    } catch (err) {
        console.log("error")
    }
}

module.exports={
    getcars:async(req,res,next)=>{
        try{
            let carsData= await car_master.findAll({attributes: ['id','name','model','year']})  
            carsData=[...carsData].map(data=> {
                return {id:data.id,name:data.name,model:data.model,year:data.year}
            })
            
            res.render('cars',{
                pageTitle: "cars",
                path: "/cars",
                carsList: carsData
            })
        }
        catch(err){
            console.log("Error occured: ",err)
            // carsData=[]
        }
    },
    GET_addcar_sync:async(req,res,next)=>{
        res.render('syncAdd',{
            pageTitle:"Add car",
            path: "/cars/add/sync"
        })
    },
    POST_addcar_sync: async(req,res,next)=>{
        const {name,model,year}=req.body
        try{
            await car_master.create({
                name:name,
                model:model,
                year:year
            })
            await car_slave1.create({
                name:name,
                model:model,
                year:year
            })
            // await car_slave2.create({
            //     name:name,
            //     model:model,
            //     year:year
            // })
            
        }
        catch(err){
            console.log(err)
            console.log("Error")
        }
        res.redirect('/cars')
    },
    GET_addcar_async:async(req,res,next)=>{
        res.render('asyncAdd',{
            pageTitle:"Add car",
            path: "/cars/add/async"
        })
    },
    POST_addcar_async: async(req,res,next)=>{
        const {name,model,year}=req.body
        try{
            await car_master.create({
                name:name,
                model:model,
                year:year
            })
            await car_temp.create({
                name:name,
                model:model,
                year:year
            })
            
        }
        catch(err){
            console.log(err)
            console.log("Error")
        }
        res.redirect('/cars')
    },
    GET_tempcars:async(req,res,next)=>{
        try {
            const user1Data=await car_temp.findAll({where:{ inUser1: false}})
            const user2Data=await car_temp.findAll({where:{ inUser2: false}})
            const tempData=await car_temp.findAll({attributes: ['id','name','model','year','inUser1','inUser2']})
            
            res.render('temp',{
                pageTitle: "temp cars",
                path: '/temp',
                carsList:tempData,
                user1Flag:user1Data.length,
                user2Flag:user2Data.length
            })
        } 
        catch (err) {
            console.log(err)
        }
        
    },
    addData_user1:async(req,res,next)=>{
        try {
            
            let user1Data=await car_temp.findAll(
                {attributes: ['name','model','year'],
                    where:{ inUser1: false}
                })
            user1Data=[...user1Data].map(data=> {
                return {name:data.name,model:data.model,year:data.year}
            })
            
            await car_slave1.bulkCreate(user1Data)
            
            await car_temp.update({
                inUser1: true,
              },
              { where: { inUser1: false } });
              await verifyRow()
              res.redirect('/cars/temp')
        } 
        catch (err) {
            console.log(err)
        }
        
    },
    addData_user2:async(req,res,next)=>{
        try {
            
            let user2Data=await car_temp.findAll(
                {attributes: ['name','model','year'],
                    where:{ inUser2: false}
                })
            user2Data=[...user2Data].map(data=> {
                return {name:data.name,model:data.model,year:data.year}
            })
            
            await car_slave2.bulkCreate(user2Data)
            
            await car_temp.update({
                inUser2: true,
              },
              { where: { inUser2: false } });
              await verifyRow()
              res.redirect('/cars/temp')
        } 
        catch (err) {
            console.log(err)
        }
        
    }
}