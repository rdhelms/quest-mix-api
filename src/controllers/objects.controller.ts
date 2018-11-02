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
    }).post(async (req, res) => {
        try {
            const body = req.body as SceneObject;
            if (body.id) delete body.id;
            const newSceneObject = SceneObject.create(body);
            res.json(newSceneObject);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });


objectsController.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const sceneObject = await SceneObject.findOne({
                where: {
                    id: Number(id)
                }
            });
            res.json(sceneObject);
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

            const result = await SceneObject.update(req.body as SceneObject, {
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

            const result = await SceneObject.destroy({
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

export { objectsController };