import express, { RequestHandler } from 'express';
import passport from 'passport';
const sessionsController = express.Router();

sessionsController.route('/')
    .get((req, res) => {
        try {
            if (req.user) {
                res.json(req.user);
            } else {
                /* istanbul ignore next */
                res.status(401).send(`Unauthorized`);
            }
        } catch (err) {
            /* istanbul ignore next */
            res.status(500).send(`${(<Error>err).name}: ${(<Error>err).message}`);
        }
    })
    .post(passport.authenticate('local') as RequestHandler, (req, res) => {
        res.json(req.user);
    })
    .delete((req, res) => {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    /* istanbul ignore next */
                    res.status(500).send('Failed to delete session');
                }
                delete req.session;
                res.json({message: 'Session successfully deleted'});
            });
        } else {
            res.status(401).send('Session deletion unsuccessful: No session was found');
        }
    });

export { sessionsController };