import express from 'express';

import authService from './auth.service';
import { resMessages } from '../../services/message.service';

const router = express.Router();

// src for chosing 409 https://www.shorturl.at/npBCT

// LOGIN
router.post('/login', async (req, res) => {
  if (req.session.loggedInUser) {
    return res.status(409).send(resMessages.alreadyLoggedIn);
  }

  try {
    const userDetails = await authService.login(req.body);
    req.session.loggedInUser = userDetails;
    res.json(userDetails);
  } catch (err) {
    res.status(401).json({ error: err });
    // TODO: handle unauthed users
  }
});

router.post('/logout', async (req, res) => {
  if (!req.session.loggedInUser) {
    return res.status(409).json({ msg: resMessages.invalidLogout });
  }

  req.session.destroy(err => {
    if (err) res.status(500).json({});
    else res.json({ msg: resMessages.successLogout });
  });
});

router.post('/signup', async (req, res) => {
  try {
    const newUser = req.body;
    const user = await authService.signup(newUser);
    req.session.user = user;
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ error: 'could not signup, please try later' });
  }
});

export default router;
