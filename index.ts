import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import { createClient } from 'redis'
import dotenv from 'dotenv'
import { streamRouter } from './routes/stream'
import { backgroundRouter } from './routes/backgrounds'
import { connectToDatabase } from './db'

dotenv.config()

// Create our Express app
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: true,
    },
})

// Setup redis adapter
const pubClient = createClient({ socket: { host: process.env.REDIS_URL, port: 6379 } })
const subClient = pubClient.duplicate()
io.adapter(createAdapter(pubClient, subClient))

// Handle socket events here
io.on('connection', socket => {
    console.log(`New client connected: ${socket.id}`)   // eslint-disable-line no-console
})

connectToDatabase().then(() => {
    // Force HTTPS
    app.use((req, res, next) => {
        const host = req.get('host')
        // The 'x-forwarded-proto' check is for Heroku
        !req.secure
        && (req.get('x-forwarded-proto') !== 'https')
        && (host && !host.includes('localhost'))
            ? res.redirect('https://' + req.get('host') + req.url)
            : next()
    })

    // Handle Content-Type application/json
    app.use(express.json({
        limit: '50mb',
    }))

    app.use(express.static('public'))

    // Streaming
    app.get('/stream', streamRouter)

    // Backgrounds
    app.use('/backgrounds', backgroundRouter)

    const port = process.env.PORT || 50000
    httpServer.listen(port, () => {
        /* eslint-disable-next-line no-console */
        console.log(`Server is listening on port ${port}`)
    })
})
