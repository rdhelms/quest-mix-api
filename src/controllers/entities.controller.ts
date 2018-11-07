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
    }).post(async (req, res) => {
        try {
            const body = req.body as Entity;
            if (body.id) delete body.id;
            const newEntity = await Entity.create(body);
            res.json(newEntity);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

entitiesController.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const entity = await Entity.findOne({
                where: {
                    id: Number(id)
                }
            });
            res.json(entity);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    })
    .patch(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const result = await Entity.update(req.body as Entity, {
                where: {
                    id: Number(id)
                },
                returning: true
            });

            if (result[0] > 0) {
                res.json(result[1][0]);
            } else {
                /* istanbul ignore next */
                res.status(400).json(result);
            }
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    })
    .delete(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const result = await Entity.destroy({
                where: {
                    id: Number(id)
                }
            });

            res.json(result);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { entitiesController };