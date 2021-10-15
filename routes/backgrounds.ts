import express from 'express'
import { backgroundCollection } from '../db'

const backgroundRouter = express.Router()

backgroundRouter.route('/')
    // GET /backgrounds
    .get(async (req, res) => {
        const backgrounds = await backgroundCollection.find().toArray()
        return res.send(backgrounds)
    })
    // POST /backgrounds
    .post(async (req, res) => {
        const name = req.body.name

        if (!name) {
            return res.status(400).send('Missing required property: name')
        }

        const result = await backgroundCollection.insertOne({
            name,
        })
        return res.send(result)
    })

backgroundRouter.route('/:backgroundId')
    // GET /backgrounds/:backgroundId
    .get((req, res) => {
        // TODO: Retrieve a background by its objectId
        return res.send('GET /backgrounds/:backgroundId')
    })
    // PATCH /backgrounds/:backgroundId
    .patch((req, res) => {
        // TODO: Update a background by its objectId
        return res.send('PATCH /backgrounds/:backgroundId')
    })

export { 
    backgroundRouter,
}
