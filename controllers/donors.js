const uniqueKeyGenerator=require('../uniqueKeyGenerator')
const {donor_master,donor_slave1,donor_slave2}=require('../models/donor');
const {victim_master}=require('../models/victim')
const {donor_victim_master,donor_victim_slave1,donor_victim_slave2}=require('../models/donor_victim')
const temp=require('../models/temp');

const generalQueryFunction=async(entity,operation,data,condition= null)=>{
    if(operation === 'write'){
            return await entity.create(data)   
    }
    else if(operation === 'writeMany'){
        return await entity.bulkCreate(data)   
    }
    else if(operation === 'delete'){
            await entity.destroy(data)
    }
    else if(operation === 'read'){
        return await entity.findAll(data)
    }
    else if(operation === 'readOne'){
        return await entity.findOne(data)
    }
    else if(operation === 'verify'){
        const result=await entity.findOne(data)
        return result === null ? false:true
    }
    else if(operation === 'update'){
        await entity.update(data,condition)
    }
}


module.exports={
    getdonors:async(req,res,next)=>{
        try{
            let donorsData=await generalQueryFunction(donor_master,'read',
                                {attributes: ['id','name','key']})
            
            donorsData=[...donorsData].map(data=> {
                return {id:data.id,name:data.name,key:data.key}
            })

            res.render('donors',{
                pageTitle: "donors",
                path: "/donors",
                donorsList: donorsData,
            })
        }
        catch(err){
            console.log("Error occured: ",err)
            // donorsData=[]
        }
    },
    getDonate:async(req,res,next)=>{
        try{
            let donorsData=await generalQueryFunction(donor_master,'read',
                                {attributes: ['id','name','key']})
            
            donorsData=[...donorsData].map(data=> {
                return {id:data.id,name:data.name,key:data.key}
            })
            let victimsData=await generalQueryFunction(victim_master,'read',{attributes: ['id','name','key']})
            victimsData=[...victimsData].map(data=> {
                return {id:data.id,name:data.name,key:data.key}
            })
            res.render('donate',{
                pageTitle: "donate",
                path: "/donate",
                donorsList: donorsData,
                victimsList:victimsData
            })
        }
        catch(err){
            console.log("Error occured: ",err)
            // donorsData=[]
        }
    },
    postDonate:async(req,res,next)=>{
        const {donor,victim,amount,async_mode}=req.body
        const key=uniqueKeyGenerator()
        try {
            let finalData=[...victim].map(v=>{
                return {victimId:v,donorId:donor,amount:amount,key:key}
            })
            const check=await generalQueryFunction(donor_victim_master,'writeMany',finalData)
            // console.log(check.length)
            if(async_mode === undefined){
                console.log('sync mode')
                await generalQueryFunction(donor_victim_slave1,'writeMany',finalData)
                // await generalQueryFunction(donor_victim_slave2,'writeMany',finalData)
            }
            else{
                const temp_data={key:key}
                await generalQueryFunction(temp,'write',temp_data)
            }
        } catch (error) {
            console.log(error)
        }
        res.redirect('/donors')
    },
    adddonor:async(req,res,next)=>{
        console.log(req.body)
        try{
            const data={
                name:req.body.name,
                key:uniqueKeyGenerator(),
            }
            await generalQueryFunction(donor_master,'write',data)
            await generalQueryFunction(donor_slave1,'write',data)
            // await generalQueryFunction(donor_slave2,'write',data) 
        }
        catch(err){
            // console.log(err)
            console.log("Error")
        }
        res.redirect('/donors')       
    },
    deletedonor:async(req,res,next)=>{
        try{
            const key=req.body.key
            await generalQueryFunction(donor_master,'delete',{where:{key:key}})
            await generalQueryFunction(donor_slave1,'delete',{where:{key:key}})
            // await generalQueryFunction(donor_slave2,'delete',{key:key})
        }
        catch(err){
            // console.log(err)
            console.log("Error")
        }
        res.redirect('/donors')
    },
    tempData:async(req,res,next)=>{
        
        try {
            const temp_data= await generalQueryFunction(temp,'read',{attributes:['id','key','inslaves']})
            res.render('temp',{
                pageTitle: "temp data",
                path: '/temp',
                temp_list:temp_data
            })   
        } catch (error) {
            console.log(error)
        }
    },
    addTempData:async(req,res,next)=>{
        const id=req.params.id
        const key=req.body.key
        try {
            let donor_victim_data = await generalQueryFunction(donor_victim_master,'read',{where:{key:key}})
            donor_victim_data=[...donor_victim_data].map(data=>{
                return {key:key,amount:data.amount,donorId:data.donorId,victimId:data.victimId}
            })
            await generalQueryFunction(donor_victim_slave1,'writeMany',donor_victim_data)
            await generalQueryFunction(temp,'delete',{where:{id:id}})

        } catch (error) {
            console.log(error)
        }
        res.redirect('/donors')
    },
    donation:async(req,res,next)=>{
        try {
            let donation_list=[]
            let donation_data=await generalQueryFunction(donor_victim_master,'read',
                            {attributes:['id','amount','donorId','victimId']})
            for(let data of [...donation_data]){
                let donor_name=await generalQueryFunction(donor_master,'readOne',{where:{id:data.donorId}})
                let victim_name=await generalQueryFunction(victim_master,'readOne',{where:{id:data.victimId}})
                donation_list.push({donor:donor_name.name,victim:victim_name.name,amount:data.amount})
            }
            res.render('donations',{
                pageTitle: "Donations",
                path: '/donations',
                donation_list:donation_list
            })
        } catch (error) {
            console.log(error)
        }
    }
}

