import bcrypt from 'bcrypt';

import { resolve, reject } from '../../services/util.service';
import dbService from '../../services/db.service';

import User from './User';
import { ObjectID } from 'mongodb';

export default {
  getByUsername,
  add,
  update
};

const _saltRounds = 10;

async function getByUsername(username: string): Promise<User> {
  try {
    const collection = await _getCollection();
    const user = collection.findOne({ username });
    if (!user) throw new Error('User not found');
    return user;
  } catch (err) {
    console.log('user.service.js - getByUserName:\n', err);
  }
  //   return reject(resMessages.invalidCredentials);
}
async function add(newUser: User) {
  try {
    newUser.password = await bcrypt.hash(newUser.password, _saltRounds);
    const collection = await _getCollection();
    // this intelisense is blowing my mind, one of the best reasons in favor of
    // adopting typescript
    await collection.insertOne(newUser);
    return newUser;
    // newUser._id = makeId();
    // gUsers.push(newUser);
    // return resolve(newUser);
  } catch (err) {
    return reject(err);
  }
}
async function update(updatedUser: User) {
  try {
    const { _id } = updatedUser;
    const collection = await _getCollection();
    // Needs checking
    const res = await collection.findOneAndUpdate(
      { _id: new ObjectID(_id) },
      { ...updatedUser }
    );
    return updatedUser;
    // newUser._id = makeId();
    // gUsers.push(newUser);
    // return resolve(newUser);
  } catch (err) {
    return reject(err);
  }
}

async function _getCollection() {
  return dbService.getCollection(dbService.collections.user);
}
