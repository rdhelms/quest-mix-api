import express from 'express';
import SceneObject from '../sequelize/models/object.model';

const objectsController = express.Router();

objectsController.route('/')
    .get(async (req, res) => {
        try {
            const objects = await SceneObject.findAll();
            res.json(objects);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { objectsController };