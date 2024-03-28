import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './Routes/auth.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

const corsOptions = {
    origin: true
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
        console.log('Error while connectin DB', error.message)
    }
}

//MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth',authRouter)


app.listen(port, 'localhost', () => {
    connectDB()
    console.log('Server running on http://localhost:' + port);
})
