import express from 'express';
import World from '../sequelize/models/world.model';
import User from '../sequelize/models/user.model';

const worldsController = express.Router();

const defaultWorld: Partial<World> = {
    id: 0,
    name: 'No Name',
    player: {
        speed: 0,
        size: {
            width: 5,
            height: 10
        },
        color: '#FFFFFF',
        direction: 'down',
        pos: {
            x: 0,
            y: 0
        }
    },
    settings: {
        speed: 1
    },
    scenes: [{
        id: 0,
        objects: []
    }],
    currentSceneId: 0,
    ownerId: 0
};

worldsController.route('/')
    .get(async (req, res) => {
        try {
            const worlds = await World.findAll();
            res.json(worlds);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    }).post(async (req, res) => {
        try {
            const requestUser = req.user as { username: string };
            const user = await User.findOne({
                where: {
                    username: requestUser && requestUser.username
                }
            });
            if (!user) {
                throw new Error('Unauthorized');
            }

            let body = req.body as Partial<World>;
            if (!body || Object.keys(body).length === 0) {
                body = defaultWorld;
            } else {
                if (body.id) delete body.id;
            }
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
            if (id === 'default') {
                return res.json(defaultWorld);
            } else {
                const world = await World.findOne({
                    where: {
                        id: Number(id)
                    }
                });
                res.json(world);
            }
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { worldsController };