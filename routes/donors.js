const router=require('express').Router();

const donorController=require('../controllers/donors')

router.get('/',donorController.getdonors)

router.get('/donate',donorController.getDonate)

router.post('/donate',donorController.postDonate)

router.post('/add',donorController.adddonor)

router.post('/delete/:id',donorController.deletedonor)

router.get('/temp',donorController.tempData)

router.post('/temp/add/:id',donorController.addTempData)

router.get('/donations',donorController.donation)

module.exports=router