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
    });

export { avatarsController };