import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully Updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed Update User" });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully Deleted",
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed To Delete User" });
    }
};

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({
            success: true,
            message: "User Found",
            data: user,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "User Not Found" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");

        res.status(200).json({
            success: true,
            message: "Users Found",
            data: users,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not Found" });
    }
};

export const getUserProfile = async (req, res) => {
    console.log('Fetching user profile...');
    const userId = req.userId;
    console.log('User ID:', userId);

    try {
        const user = await User.findById(userId); 
        console.log('User profile data:', user);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const {password, ...rest} = user._doc;

        console.log('User details:', rest);

        res.status(200).json({
            success: true,
            message: "User details retrieved successfully",
            data: { ...rest },
        });
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ success: false, message: "Something went wrong, cannot get" });
    }
};


export const getMyAppointments = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.userId });

        const doctorIds = bookings.map((element) => element.doctor.id);

        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select(
            "-password"
        );

        res
            .status(200)
            .json({
                success: true,
                message: "Appointments are getting",
                data: doctors,
            });
    } catch (err) {
        res
            .status(500)
            .json({ success: false, message: "Something went wrong, cannot get" });
    }
};
