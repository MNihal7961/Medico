import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

export const authenticate = async (req, res, next) => {

    //GET TOKEN FROM HEADERS
    const authToken = req.headers.authorization

    //CHECK TOKEN IS EXISTS
    if (!authToken || !authToken.startsWith('Bearer')) {
        return res.status(401).json({ success: false, message: 'No Token, authorization denied' })
    }

    try {
        const token = authToken.split(" ")[1]

        //VERIFY TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.userId = decoded.id
        req.role = decoded.role
        console.log('authenticated');
        next()

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token is expired" })
        }

        return res.status(401).json({ success: false, message: "Invalid Token" })
    }
}

export const restrict = roles => async (req, res, next) => {
    try {
        const userId = req.userId;

        let user;
        let userRole;

        const patient = await User.findById(userId);
        const doctor = await Doctor.findById(userId);

        if (patient) {
            user = patient;
            userRole = "patient";
        } else if (doctor) {
            user = doctor;
            userRole = "doctor";
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!roles.includes(userRole)) {
            return res.status(401).json({ success: false, message: "You are not authorized" });
        }
        console.log('going to get profile');
        next();
    } catch (error) {
        console.error("Error in restrict middleware:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
