import express from 'express';
import Entity from '../sequelize/models/entity.model';

const entitiesController = express.Router();

entitiesController.route('/')
    .get(async (req, res) => {
        try {
            const entities = await Entity.findAll();
            res.json(entities);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { entitiesController };