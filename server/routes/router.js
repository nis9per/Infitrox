const express=require('express')
const router=express.Router();

const services=require('../services/render')
const controller=require('../controller/controller')
const upload=require('../middleware/upload')


/**
 * @description Root Route
 * @method GET/  
 */
router.get('/',services.homeRoutes)

/**
 * @description Add Users
 * @method GET /add_user 
 */
router.get('/add_user',services.addUser)
/**
 * @description Update Users
 * @method GET /update_user
 */
router.get('/update_user',services.updateUser)

//API 
router.post('/api/users',upload.single('avatar'),controller.create)
router.get('/api/users',controller.find)
router.put('/api/users/:id',controller.update)
router.delete('/api/users/:id',controller.delete)



module.exports=router;