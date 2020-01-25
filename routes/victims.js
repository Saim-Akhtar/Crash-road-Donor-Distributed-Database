const router=require('express').Router();

const victimController=require('../controllers/victims')

router.get('/',victimController.getvictims)

router.get('/incident/:incidentId',victimController.getIncident_victims)

router.post('/add',victimController.addvictim)

router.post('/delete/:id',victimController.deletevictim)

module.exports=router