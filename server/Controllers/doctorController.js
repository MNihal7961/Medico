import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'

export const updateDoctor = async (req, res) => {

    const id = req.params.id

    try {

        console.log(req.body.ticketPrice,"????????")
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true })

        res
            .status(200)
            .json({
                success: true,
                message: "Successfully Updated",
                data: updatedDoctor
            })
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed Update Doctor" })
    }
}

export const deleteDoctor = async (req, res) => {

    const id = req.params.id

    try {

        await Doctor.findByIdAndDelete(id)

        res
            .status(200)
            .json({
                success: true,
                message: "Successfully Deleted",
            })
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed To Delete Doctor" })
    }
}

export const getSingleDoctor = async (req, res) => {

    const id = req.params.id

    try {

        const doctor = await Doctor.findById(id).populate('reviews').select("-password")

        res
            .status(200)
            .json({
                success: true,
                message: "Doctor Found",
                data: doctor
            })
    } catch (err) {
        res.status(404).json({ success: false, message: "Doctor Not Found" })
    }
}

export const getAllDoctors = async (req, res) => {
    try {

        const { query } = req.query
        let doctors

        if (query) {
            doctors = await Doctor.find(
                {
                    isApproved: "approved", $or: [
                        { name: { $regex: query, $options: "i" } },
                        { specialization: { $regex: query, $options: "i" } }
                    ]
                }
            ).select("-password")
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select("-password")
        }

        res
            .status(200)
            .json({
                success: true,
                message: "Doctors Found",
                data: doctors
            })
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" })
    }
}

export const getDoctorProfile = async (req, res) => {

    const doctorId = req.userId
    console.log(doctorId,"dfghvbjkle")

    try {

        const doctor = await Doctor.findById(doctorId)

        console.log(doctor,"xsdfghvjbk")

        if (!doctor) {
            res.status(404).json({ success: false, message: "Doctor not found" })
        }

        const [password, ...rest] = doctor._doc
        const appointments = await Booking.find({ doctor: doctorId })

        if(!appointments){
            appointments=[]
        }

        console.log(appointments,"redfhgj")

        res.status(200).json({ success: true, message: "Doctor profile getting", data: { ...rest, appointments } })

    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong try again" })
    }
}

export const fetchData=async(req,res)=>{
    const id=req.userId
    try{
        const doc=await Doctor.findById(id)

        console.log(doc)

        if(!doc){
            res.status(404).json({success:false,message:"not found"})
        }

        res.status(200).json({success:true,message:"success",data:doc})
    }catch(err){
        console.log(err)
    }
}