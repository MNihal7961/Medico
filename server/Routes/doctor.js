import express from 'express'
import { updateDoctor, deleteDoctor, getSingleDoctor, getAllDoctors, getDoctorProfile,fetchData } from '../Controllers/doctorController.js'
import { authenticate, restrict } from '../auth/verifyToken.js'
import reviewRouter from './review.js'

const router = express.Router()

router.use("/:doctorId/reviews", reviewRouter)

router.get('/:id', getSingleDoctor)
router.get('/', getAllDoctors)
router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor)
router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor)
router.get('/profile', authenticate, restrict(["doctor"]), getDoctorProfile)
router.get('/profile/me', authenticate, restrict(["doctor"]), fetchData)

export default router 