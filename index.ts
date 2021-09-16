// import ParseDashboard from 'parse-dashboard'
import express, { NextFunction, Request, Response } from 'express'
// import { ParseServer } from 'parse-server'
import throng from 'throng'
import dotenv from 'dotenv'
import { createReadStream } from 'fs'
import cors from 'cors'

dotenv.config()

const port = process.env.PORT || 5000
// const appId = process.env.APP_ID
// const appName = process.env.APP_NAME || 'Quest Mix API'
// const masterKey = process.env.MASTER_KEY
const rootUrl = process.env.ROOT_URL || `http://localhost:${port}`
const mountPath = process.env.MOUNT_PATH || '/api'
const serverURL = `${rootUrl}${mountPath}`

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

    app.use(express.static('public'))

    // Mount streaming path
    app.get('/stream', cors(), (req, res) => {
        const readStream = createReadStream('./data.txt')
        readStream.on('data', (data) => {
            res.write(data)
        })
        readStream.on('end', () => {
            res.status(200).send()
        })
    })

    // // Create the Parse Server
    // const parseServer = new ParseServer({
    //     appId,
    //     appName,
    //     cloud: './dist/cloud/main.js',
    //     databaseURI: process.env.DATABASE_URI || 'mongodb://localhost',
    //     masterKey,
    //     mountPath,
    //     port,
    //     serverURL,
    // })
    // app.use(mountPath, parseServer)

    // // Graft on the dashboard
    // const dashboard = new ParseDashboard({
    //     apps: [{
    //         appId,
    //         appName,
    //         masterKey,
    //         serverURL,
    //     }],
    //     port,
    //     trustProxy: 1,
    //     users: [{
    //         user: process.env.DASHBOARD_USERNAME,
    //         pass: process.env.DASHBOARD_PASSWORD,
    //     }],
    // })
    // app.use('/dashboard', dashboard)

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
