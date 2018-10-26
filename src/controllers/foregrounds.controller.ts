import express from 'express';
import Foreground from '../sequelize/models/foreground.model';

const foregroundsController = express.Router();

foregroundsController.route('/')
    .get(async (req, res) => {
        try {
            const foregrounds = await Foreground.findAll();
            res.json(foregrounds);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { foregroundsController };