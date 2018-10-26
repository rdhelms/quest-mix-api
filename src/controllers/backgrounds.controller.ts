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
    })
    .post(async (req, res) => {
        try {
            const body = req.body as Background;
            if (body.id) delete body.id;
            const newBackground = Background.create(body);
            res.json(newBackground);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { backgroundsController };