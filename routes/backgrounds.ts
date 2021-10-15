import express from 'express'
import { db } from '../db'

const backgroundRouter = express.Router()

backgroundRouter.route('/')
    // GET /backgrounds
    .get((req, res) => {
        // TODO: Retrieve all backgrounds from Mongo (those that are single documents or those that are many documents)
        return res.send('GET /backgrounds')
    })
    // POST /backgrounds
    .post(async (req, res) => {
        // TODO: Process the background
        // TODO: Save the background to Mongo as a single large document
        // TODO: Save the background to Mongo as many small documents
        const backgrounds = await db.collection('backgrounds').find().toArray()
        return res.send(backgrounds)
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
