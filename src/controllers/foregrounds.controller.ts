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
    })
    .post(async (req, res) => {
        try {
            const body = req.body as Foreground;
            if (body.id) delete body.id;
            const newForeground = Foreground.create(body);
            res.json(newForeground);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { foregroundsController };