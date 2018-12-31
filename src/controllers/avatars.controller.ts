import express from 'express';
import Avatar from '../sequelize/models/avatar.model';

const avatarsController = express.Router();

avatarsController.route('/')
    .get(async (req, res) => {
        try {
            const avatars = await Avatar.findAll();
            res.json(avatars);
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    }).post(async (req, res) => {
        try {
            const body = req.body as Avatar;
            if (body.id) delete body.id;
            const newAvatar = await Avatar.create(body);
            res.json(newAvatar);
        } catch (err) {
            /* istanbul ignore next */
            res.status(401).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    });

avatarsController.route('/:id')
    .get(async (req, res) => {
        try {
            const { id } = req.params as {
                id: string;
            };

            const avatar = await Avatar.findOne({
                where: {
                    id: Number(id),
                },
            });
            res.json(avatar);
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

            const result = await Avatar.update(req.body as Avatar, {
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

            const result = await Avatar.destroy({
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

export { avatarsController };