import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRouter from './Routes/auth.js'
import userRouter from './Routes/user.js'
import doctorRouter from './Routes/doctor.js'
import reviewRouter from './Routes/review.js'
import bookingRouter from './Routes/booking.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin: true,
    credential: true
}

app.get('/', (req, res) => {
    res.send('server working')
})

//DATABASE CONNECTION
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('mongoDB connected')
    } catch (error) {
        console.log('Error while connectin DB')
        console.error(error.message)
    }
}

//MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

//Routes
app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/doctor", doctorRouter)
app.use("/review", reviewRouter)
app.use("/booking", bookingRouter)


app.listen(port, 'localhost', () => {
    console.log('Server running on http://localhost:' + port);
    connectDB()
})
