import express from 'express';
import { promisify } from 'util'

import authService from '../services/auth.service';
import { resMessages } from '../services/message.service';
import session from 'express-session';

const router = express.Router();

// LOGIN
router.post('/login', async (req, res) => {
    // not already logged in!
    // src for chosing 409 https://www.shorturl.at/npBCT
    if (req.session.loggedInUser) return res.status(409).send(resMessages.alreadyLoggedIn);

    const credentials = req.body;
    try {
        const approvedCredentials = await authService.login(credentials)
        req.session.loggedInUser = approvedCredentials;
        res.json(approvedCredentials);
    } catch (err) {
        // TODO: handle unauthed users
    }
});

router.post('/logout', async (req, res) => {
    // not already logged in!
    // src for chosing 409 https://www.shorturl.at/npBCT
    if (!req.session.loggedInUser) return res.status(409).send(resMessages.invalidLogout);
    let sessionDestroy = promisify(req.session.destroy);
    try {
        await sessionDestroy();
        res.send(resMessages.successLogout);
    } catch (err) {
        res.status(500).json(err);
    }
})
// router.post('/signup', async (req, res) => {
//     const newCredentials = req.body;
//     try {
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

export default router;