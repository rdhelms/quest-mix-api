import express from 'express'

const backgroundRouter = express.Router()

backgroundRouter.post('/backgrounds', (req, res) => {
    // TODO: Process the background
    // TODO: Save the background to Mongo as a single large document
    // TODO: Save the background to Mongo as many small documents
    return res.send({
        function: 'create',
        status: 'ok',
    })
})

// TODO: Add a `fetchAll` handler to fetch backgrounds from Mongo (single document or many documents)
backgroundRouter.get('/backgrounds', (req, res) => {
    // TODO: Retrieve all the backgrounds from Mongo (those that are single documents or those that are many documents)
})

// TODO: Add a `fetchById` handler to fetch a single background by its objectId (single document or many documents)
backgroundRouter.get('/backgrounds/:id', (req, res) => {
    // TODO: Retrieve a single background by its objectId (single document or many documents)
})

export { 
    backgroundRouter,
}
