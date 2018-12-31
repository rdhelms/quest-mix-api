import express from 'express';
import Player from '../sequelize/models/player.model';

const playersController = express.Router();

playersController.route('/')
    .get(async (req, res) => {
        try {
            const players = await Player.findAll();
            res.json(players);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    }).post(async (req, res) => {
        try {
            const body = req.body as Partial<Player>;
            if (body.id) delete body.id;
            const newPlayer = await Player.create(body);
            res.json(newPlayer);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

playersController.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const player = await Player.findOne({
                where: {
                    id: Number(id),
                },
            });
            res.json(player);
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

            const result = await Player.update(req.body as Player, {
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

            const result = await Player.destroy({
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

export { playersController };