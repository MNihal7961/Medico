import express from 'express'
import { updateUser, deleteUser, getSingleUser, getAllUsers } from '../Controllers/userController.js'
import {authenticate,restrict} from '../auth/verifyToken.js'

const router=express.Router()

router.get('/:id',authenticate,getSingleUser)
router.get('/',getAllUsers)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)



export default router