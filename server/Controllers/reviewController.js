import Review from '../models/ReviewSchema.js'
import Doctor from '../models/DoctorSchema.js'

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
        res.status(200).json({ success: true, message: "successful", data: reviews })
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found", })
    }
}

export const createReview = async (req, res) => {

    if (!req.body.doctor) req.body.docto = req.params.doctorId
    if (!req.body.user) req.body.user = req.userId

    const nameReview = new Review(req.body)

    console.log(nameReview,"/////")
    console.log(req.params.doctorId,";;;;;")
    try {

        const savedReview = await nameReview.save()

        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id }
        })

        res.status(200).json({ success: true, message: "Review Submited", data: savedReview })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message })
    }
}