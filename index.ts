import express, { NextFunction, Request, Response } from 'express'
import throng from 'throng'
import dotenv from 'dotenv'
import cors from 'cors'
import { stream } from './routes/stream'
import * as backgrounds from './routes/backgrounds'

dotenv.config()

const port = process.env.PORT || 5000
const serverURL = process.env.ROOT_URL || `http://localhost:${port}`

const start = () => {
    // Create our Express app and force HTTPS
    const app = express()
    app.use((req: Request, res: Response, next: NextFunction) => {
        const host = req.get('host')
        // The 'x-forwarded-proto' check is for Heroku
        !req.secure
        && (req.get('x-forwarded-proto') !== 'https')
        && (host && !host.includes('localhost'))
            ? res.redirect('https://' + req.get('host') + req.url)
            : next()
    })
    app.use(cors())

    app.use(express.static('public'))

    // Streaming
    app.get('/stream', stream)

    // Backgrounds
    app.post('/backgrounds', backgrounds.create)

    app.listen(port, () => {
        /* eslint-disable-next-line no-console */
        console.log(`Started server at ${serverURL}`)
    })
}

throng({
    workers: process.env.WORKERS || 1,
    lifetime: Infinity,
    start,
})
