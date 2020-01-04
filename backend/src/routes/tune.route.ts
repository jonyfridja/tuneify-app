import express from 'express';
import tuneService from '../services/tune.service';
import { resMessages } from '../services/message.service';

const router = express.Router();
// LIST
router.get('/', async (req, res) => {
    try {
        const tunes = await tuneService.query();
        res.json(tunes);
    } catch (err) {
        res.status(401).json(err)
    }
})
// READ
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tune = await tuneService.getById(id);
        res.json(tune);
    } catch (err) {
        res.status(401).json(err);
    }
})
// CREATE
router.post('/', async (req, res) => {
    const newTune = req.body;
    try {
        const addedTune = await tuneService.add(newTune);
        res.status(201).json(addedTune);
    } catch (err) {
        // TODO: message service can mb help me diagnose the err.message and return the code?
        let code = 500;
        if (err.message === resMessages.unknownId) code = 401;
        else res.status(code).json(err);
    }
})
// UPDATE
router.put('/:id', async (req, res) => {
    const { id } = req.params; // TODO: ask yaron why, you do this rest
    const tuneToUpdate = req.body;

    try {
        const updatedTune = await tuneService.update(tuneToUpdate);
        res.json(updatedTune);
    } catch (err) {
        let code = 500;
        if (err.message === resMessages.unknownId) code = 401;
        else res.status(code).json(err);
    }
})
// REMOVE
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const msg = await tuneService.removeById(id)
        res.json({ msg });
    } catch (err) {
        res.status(404).json({ err });
    }
})

export default router;