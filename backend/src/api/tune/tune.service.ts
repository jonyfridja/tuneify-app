import Tune from './Tune';
import { reject, resolve, makeId } from '../../services/util.service';
import { resMessages } from '../../services/message.service';

import dbService from '../../services/db.service';

const gTunes = <any[]>require('./tunes.json');

export default {
    query,
    getById,
    update,
    removeById,
    add
}

async function query(filterBy: any = {}): Promise<Tune[]> {
    const criteria = {};

    if(filterBy.txt) {
        // ...
    }

    try {
        const collection = await _getCollection();
        return await collection.find({}).toArray();
    } catch (err) {
        
    }
    return resolve([...gTunes]);
}

function getById(id): Promise<Tune> {
    const tune = gTunes.find(t => t._id === id)
    if (tune) return resolve(tune);
    return reject(resMessages.wrondId);
}

function update(tune: Tune) {
    const idx = gTunes.findIndex(t => t._id === tune._id);
    if (idx === -1) return reject(resMessages.wrondId)

    let tuneToUpdate = gTunes.find(t => t._id === tune._id);
    //  new Tune filters unwanted properies - clean data, happy data
    tuneToUpdate = new Tune(tune);
    gTunes.splice(idx, 1, tuneToUpdate);

    return resolve({ ...tuneToUpdate });
}

function removeById(id): Promise<string> {
    const idx = gTunes.findIndex(t => t._id === id);
    if (idx === -1) return reject(resMessages.unknownId);
    gTunes.splice(idx, 1);
    return resolve(resMessages.successRemove);
}

function add(tune: Tune) {
    const tuneToAdd = new Tune(tune);
    tuneToAdd._id = makeId();
    gTunes.push(tuneToAdd);
    return resolve(tuneToAdd);
}

async function _getCollection() {
    return dbService.getCollection(dbService.collections.tune); 
}