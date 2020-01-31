import Tune from './Tune';
import { reject, resolve, makeId } from '../../services/util.service';
import { resMessages } from '../../services/message.service';

import dbService from '../../services/db.service';
import { ObjectId } from 'mongodb';

const gTunes = <any[]>require('./tunes.json');

export default {
  query,
  getById,
  update,
  removeById,
  add
};

async function query(filterBy: any = {}): Promise<Tune[]> {
  const criteria = {};

  if (filterBy.txt) {
    // ...
  }

  try {
    const collection = await _getCollection();
    return await collection.find({}).toArray();
  } catch (err) {
    console.log('err', err);
    throw err;
  }
}

async function getById(_id): Promise<Tune> {
  const collection = await _getCollection();
  try {
    const tune = collection.findOne({ _id });
    if (!tune) throw new Error('Tune not found');
    return tune;
  } catch (err) {
    console.log('tune.service.js - getById:\n', err);
    throw err;
  }
}

async function update(tune: Tune) {
  const { _id } = tune;
  const collection = await _getCollection();
  // Needs checking
  try {
    const res = await collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { ...tune }
    );
    return tune;
  } catch (err) {}
}

function removeById(id): Promise<string> {
  const idx = gTunes.findIndex(t => t._id === id);
  if (idx === -1) return reject(resMessages.unknownId);
  gTunes.splice(idx, 1);
  return resolve(resMessages.successRemove);
}

async function add(tune: Tune) { 
  const collection = await _getCollection();
  // Needs checking
  try {
    const res = await collection.insertOne(tune);
    return tune;
  } catch (err) {}
}

async function _getCollection(collectionName = dbService.collections.tune) {
  return dbService.getCollection(collectionName);
}
