import express from 'express';
const indexController = express.Router();

indexController.route('/')
    .get(async (req, res) => {
        try {
            res.send('Welcome to the Quest Mix API');
        } catch(err) {
            console.error(err);
            res.status(500).send(`Error: ${JSON.stringify(err, null, 4)}`);
        }
    });

export { indexController };