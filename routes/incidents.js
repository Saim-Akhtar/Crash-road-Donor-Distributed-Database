const router=require('express').Router();

const incidentController=require('../controllers/incidents')

router.get('/',incidentController.getincidents)

router.post('/add',incidentController.addincident)

router.post('/delete/:id',incidentController.deleteincident)

module.exports=router