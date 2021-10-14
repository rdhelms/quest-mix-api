import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { stream } from './routes/stream'
import { backgroundRouter } from './routes/backgrounds'

dotenv.config()

const port = process.env.PORT || 5000
const serverURL = process.env.ROOT_URL || `http://localhost:${port}`

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

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.post('/backgrounds', (req, res) => {
    return res.send('ok')
})

app.use(express.static('public'))

// // Streaming
// app.get('/stream', stream)

// // Backgrounds
// app.use(backgroundRouter)

app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Started server at ${serverURL}`)
})
