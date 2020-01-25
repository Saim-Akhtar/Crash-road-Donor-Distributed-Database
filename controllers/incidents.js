const uniqueKeyGenerator=require('../uniqueKeyGenerator')
const {incident_master,incident_slave1,incident_slave2}=require('../models/incident');
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
    getincidents:async(req,res,next)=>{
        try{
            let incidentsData=await generalQueryFunction(incident_master,'read',
                                {attributes: ['id','location','key','date']})
            
            incidentsData=[...incidentsData].map(data=> {
                return {id:data.id,location:data.location,date:data.date,key:data.key}
            })

            res.render('incidents',{
                pageTitle: "incidents",
                path: "/incidents",
                incidentsList: incidentsData,
            })
        }
        catch(err){
            console.log("Error occured: ",err)
            // incidentsData=[]
        }
    },
    addincident:async(req,res,next)=>{
        try{
            const data={
                date:req.body.date,
                location:req.body.location,
                key:uniqueKeyGenerator(),
            }

            await generalQueryFunction(incident_master,'write',data)
            await generalQueryFunction(incident_slave1,'write',data)
            // await generalQueryFunction(incident_slave2,'write',data) 
        }
        catch(err){
            console.log(err)
            console.log("Error")
        }
        res.redirect('/incidents')       
    },
    deleteincident:async(req,res,next)=>{
        try{
            const key=req.body.key
            await generalQueryFunction(incident_master,'delete',{where:{key:key}})
            await generalQueryFunction(incident_slave1,'delete',{where:{key:key}})
            // await generalQueryFunction(incident_slave2,'delete',{key:key})
        }
        catch(err){
            console.log(err)
            console.log("Error")
        }
        res.redirect('/incidents')
    }
}
