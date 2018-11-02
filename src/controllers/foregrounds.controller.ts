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

foregroundsController.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const foreground = await Foreground.findOne({
                where: {
                    id: Number(id)
                }
            });
            res.json(foreground);
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

            const result = await Foreground.update(req.body as Foreground, {
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

            const result = await Foreground.destroy({
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

export { foregroundsController };