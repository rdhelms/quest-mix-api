import express from 'express';
import bcrypt from 'bcrypt';
import User from '../sequelize/models/user.model';
const usersController = express.Router();

usersController.route('/')
    .post(async (req, res) => {
        try {
            const body = req.body as User;

            // Encrypt password using bcrypt
            const hash = await bcrypt.hash(body.password, 10);

            const newUser = await User.create({
                username: body.username,
                password: hash
            });

            res.json(newUser);
        } catch (err) {
            res.status(401).json(err);
        }
    });

export { usersController };