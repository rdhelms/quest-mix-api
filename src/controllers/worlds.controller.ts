import express from 'express';
import World from '../sequelize/models/world.model';
import User from '../sequelize/models/user.model';
import Player from '../sequelize/models/player.model';
import Avatar from '../sequelize/models/avatar.model';

const worldsController = express.Router();

worldsController.route('/')
    .get(async (req, res) => {
        try {
            const worlds = await World.findAll();
            res.json(worlds);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    })
    .post(async (req, res) => {
        try {
            const requestUser = req.user as { username: string };
            const user = await User.findOne({
                where: {
                    username: requestUser && requestUser.username,
                },
            });
            if (!user) {
                throw new Error('Unauthorized');
            }

            const body = req.body as Partial<World>;
            if (body.id) delete body.id;
            body.ownerId = user.id;
            const newWorld = await World.create(body);
            res.json(newWorld);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

worldsController.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };
            const world = await World.findOne({
                where: {
                    id: Number(id),
                },
                include: [
                    { model: Player, include: [ Avatar ] },
                    { model: User },
                ],
            });
            res.json(world);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    })
    .patch(async (req, res) => {
        try {
            const requestUser = req.user as { username: string };
            const user = await User.findOne({
                where: {
                    username: requestUser && requestUser.username,
                },
            });
            if (!user) {
                throw new Error('Unauthorized');
            }

            const { id } = req.params as {
                id: string;
            };

            const result = await World.update(req.body as World, {
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
    });

export { worldsController };