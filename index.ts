import ParseDashboard from 'parse-dashboard'
import express, { NextFunction, Request, Response } from 'express'
import { ParseServer } from 'parse-server'
import throng from 'throng'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 5000
const appId = process.env.APP_ID
const appName = process.env.APP_NAME || 'Quest Mix API'
const masterKey = process.env.MASTER_KEY
const rootUrl = process.env.ROOT_URL || `http://localhost:${port}`
const mountPath = process.env.MOUNT_PATH || '/api'
const serverUrl = `${rootUrl}${mountPath}`

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

    // Create the Parse Server
    const parseServer = new ParseServer({
        appId,
        appName,
        cloud: './dist/cloud/main.js',
        databaseURI: process.env.DATABASE_URI || 'mongodb://localhost',
        masterKey,
        mountPath,
        port,
        serverUrl,
    })
    app.use(mountPath, parseServer)

    // Graft on the dashboard
    const dashboard = new ParseDashboard({
        apps: [{
            appId,
            appName,
            masterKey,
            serverUrl,
        }],
        port,
        trustProxy: 1,
        users: [{
            user: process.env.DASHBOARD_USERNAME,
            pass: process.env.DASHBOARD_PASSWORD,
        }],
    })
    app.use('/dashboard', dashboard)

    app.listen(port, () => {
        /* eslint-disable-next-line no-console */
        console.log(`Started server at ${serverUrl}`)
    })
}

throng({
    workers: process.env.WORKERS || 1,
    lifetime: Infinity,
    start,
})
