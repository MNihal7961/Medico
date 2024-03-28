import express from 'express'
import {updateDoctor,deleteDoctor,getSingleDoctor,getAllDoctors} from '../Controllers/doctorController.js'
import {authenticate,restrict} from '../auth/verifyToken.js'

const router=express.Router()

router.get('/:id',authenticate,getSingleDoctor)
router.get('/',getAllDoctors)
router.put('/:id',updateDoctor)
router.delete('/:id',deleteDoctor)

export default router