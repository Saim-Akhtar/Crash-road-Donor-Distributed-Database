const uniqueKeyGenerator=require('../uniqueKeyGenerator')
const {victim_master,victim_slave1,victim_slave2}=require('../models/victim');
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
    getvictims:async(req,res,next)=>{
        try{
            let victimsData=await generalQueryFunction(victim_master,'read',
                                {attributes: ['id','name','key']})
            
            victimsData=[...victimsData].map(data=> {
                return {id:data.id,name:data.name,key:data.key}
            })

            res.render('victims',{
                pageTitle: "victims",
                path: "/victims",
                victimsList: victimsData,
            })
        }
        catch(err){
            console.log("Error occured: ",err)
            // victimsData=[]
        }
    },
    getIncident_victims:async(req,res,next)=>{
        const id=req.params.incidentId
        try{
            let victimsData=await generalQueryFunction(victim_master,'read',
                                {where:{incidentId:id},attributes: ['id','name','key']})
            
            victimsData=[...victimsData].map(data=> {
                return {id:data.id,name:data.name,key:data.key}
            })

            res.render('incident_victim',{
                pageTitle: "Incident Victims",
                path: "/incident_victims",
                victimsList: victimsData,
                incidentId:id
            })
        }
        catch(err){
            console.log("Error occured: ",err)
            // victimsData=[]
        }
    },
    addvictim:async(req,res,next)=>{
        const id=req.body.incidentId
        console.log(req.body)
        try{
            const data={
                name:req.body.name,
                incidentId:id,
                key:uniqueKeyGenerator(),
            }

            await generalQueryFunction(victim_master,'write',data)
            await generalQueryFunction(victim_slave1,'write',data)
            // await generalQueryFunction(victim_slave2,'write',data) 
        }
        catch(err){
            // console.log(err)
            console.log("Error")
        }
        res.redirect('/victims/incident/'+id)       
    },
    deletevictim:async(req,res,next)=>{
        try{
            const key=req.body.key
            await generalQueryFunction(victim_master,'delete',{where:{key:key}})
            await generalQueryFunction(victim_slave1,'delete',{where:{key:key}})
            // await generalQueryFunction(victim_slave2,'delete',{key:key})
        }
        catch(err){
            // console.log(err)
            console.log("Error")
        }
        res.redirect('/victims')
    }
}
