import express from 'express';
const indexController = express.Router();

indexController.route('/')
    .get(async (req, res) => {
        try {
            res.send('Welcome to the Quest Mix API');
        } catch(err) {
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { indexController };