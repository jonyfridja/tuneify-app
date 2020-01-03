import Tune from '../models/Tune';

const gTunes = <Tune[]>require('./tunes.json');

const errMessages = {
    wrondId: 'Wrong Id',
    unknownId: 'Unknown Id',
    successRemove: 'Succesfuly removed'
}

export default {
    query,
    getById,
    removeById,
    update
}

function query(filterBy = {}): Promise<Tune[]> {
    return _resolve([...gTunes]);
}

function getById(id): Promise<Tune> {
    const tune = gTunes.find(t => t._id === id)
    if (tune) return _resolve(tune);
    return _reject(errMessages.wrondId);
}

function update(tune: Tune) {
    const idx = gTunes.findIndex(t => t._id === tune._id);
    if (idx === -1) _reject(errMessages.wrondId)

    let tuneToUpdate = gTunes.find(t => t._id === tune._id);
    //  new Tune filters unwanted properies - clean data, happy data
    tuneToUpdate = new Tune(tuneToUpdate);
    gTunes.splice(idx, 1, tuneToUpdate);

    _resolve({ ...tuneToUpdate });
}

function removeById(id) {
    const idx = gTunes.findIndex(t => t._id === id);
    if (idx === -1) return _reject(errMessages.unknownId);
    gTunes.splice(idx, 1);
    return _resolve(errMessages.successRemove);
}


function _resolve(val): Promise<any> {
    return Promise.resolve(val);

}

function _reject(val): Promise<any> {
    return Promise.reject(val);

}
