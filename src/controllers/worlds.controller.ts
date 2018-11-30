import express from 'express';
import World from '../sequelize/models/world.model';

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
    }).post(async (req, res) => {
        try {
            let body = req.body as Partial<World>;
            if (!body || Object.keys(body).length === 0) {
                body = {
                    name: 'No Name',
                    player: {
                        speed: 0,
                        size: {
                            width: 5,
                            height: 10
                        },
                        color: '#FFFFFF',
                        direction: 'down',
                        sceneId: 0,
                        pos: {
                            x: 0,
                            y: 0
                        }
                    },
                    scenes: [{
                        id: 0,
                        objects: []
                    }]
                };
            } else {
                if (body.id) delete body.id;
            }
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
                    id: Number(id)
                }
            });
            res.json(world);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

export { worldsController };