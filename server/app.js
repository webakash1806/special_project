import cookieParser from "cookie-parser";
import { config } from "dotenv";
import express from 'express'
import cors from 'cors'
import morgan from "morgan";

config()

const app = express()

app.use(express.urlencoded({ extended: true }))


app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))

app.use(morgan('dev'))

app.use('/ping', function (req, res) {
    res.send('/pong')
})

// app.use('/api/v1/user')


app.all('*', (req, res) => {
    res.status(404).send('OOPS! 404 Page not found')
})

export default app