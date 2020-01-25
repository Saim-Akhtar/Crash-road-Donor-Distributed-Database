const router=require('express').Router();

const carController=require('../controllers/cars')

router.get('/',carController.getcars)

router.get('/add/sync',carController.GET_addcar_sync)

router.post('/add/sync',carController.POST_addcar_sync)

router.get('/add/async',carController.GET_addcar_async)

router.post('/add/async',carController.POST_addcar_async)

router.get('/temp',carController.GET_tempcars);

router.get('/add/user1',carController.addData_user1)

router.get('/add/user2',carController.addData_user2)

module.exports=router