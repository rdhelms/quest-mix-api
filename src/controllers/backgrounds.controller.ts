import express from 'express';
import Background from '../sequelize/models/background.model';

const backgroundsController = express.Router();

backgroundsController.route('/')
    .get(async (req, res) => {
        try {
            const backgrounds = await Background.findAll();
            res.json(backgrounds);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });