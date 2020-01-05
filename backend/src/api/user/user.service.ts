import User from "./User";
import { resolve, reject, makeId } from '../../services/util.service';
import { resMessages } from "../../services/message.service";

import bcrypt from 'bcrypt';
export default {
    getByUsername,
    add
}

const _saltRounds = 10;

const gUsers = <User[]>require('./users.json');

function getByUsername(username: string): Promise<User> {
    const user = gUsers.find(u => u.username === username);
    if (user) return resolve(user);
    return reject(resMessages.invalidCredentials);
}
async function add(newUser: User) {
    try {
        newUser.password = await bcrypt.hash(newUser.password, _saltRounds);
        newUser._id = makeId();
        gUsers.push(newUser);
        return resolve(newUser);
    } catch (err) {
        return reject(err);
    }
}