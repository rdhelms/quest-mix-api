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
            const newBackground = await Background.create(body);
            res.json(newBackground);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

backgroundsController.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const background = await Background.findOne({
                where: {
                    id: Number(id),
                },
            });
            res.json(background);
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

            const result = await Background.update(req.body as Background, {
                where: {
                    id: Number(id),
                },
                returning: true,
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

            const result = await Background.destroy({
                where: {
                    id: Number(id),
                },
            });

            res.json(result);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { backgroundsController };