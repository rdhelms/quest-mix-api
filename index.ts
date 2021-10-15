import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { streamRouter } from './routes/stream'
import { backgroundRouter } from './routes/backgrounds'

dotenv.config()

const port = process.env.PORT || 5000
const serverURL = process.env.ROOT_URL || `http://localhost:${port}`

// Create our Express app
const app = express()

// // Force HTTPS
// app.use((req, res, next) => {
//     const host = req.get('host')
//     // The 'x-forwarded-proto' check is for Heroku
//     !req.secure
//     && (req.get('x-forwarded-proto') !== 'https')
//     && (host && !host.includes('localhost'))
//         ? res.redirect('https://' + req.get('host') + req.url)
//         : next()
// })

// CORS
app.use(cors())

// Handle Content-Type application/json
app.use(express.json({
    limit: '50mb',
}))

app.use(express.static('public'))

// Streaming
app.get('/stream', streamRouter)

// Backgrounds
app.use('/backgrounds', backgroundRouter)

app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log(`Started server at ${serverURL}`)
})
