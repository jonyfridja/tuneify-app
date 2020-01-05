const bcrypt = require('bcrypt');
import userService from "../user/user.service";

import { resolve, reject } from "../../services/util.service"
import { resMessages } from "../../services/message.service";


import User from '../user/User';

export default {
    login,
    logout,
    signup
}

async function login(username: string, password: string) {
    if (!username || !password) return Promise.reject(resMessages.requiredCredentials)

    const user = await userService.getByUsername(username)
    if (!user) return Promise.reject(resMessages.invalidCredentials)
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject(resMessages.invalidCredentials)
    delete user.password;
    return user;
}

function logout() {
    return resolve(resMessages.successLogout);
}

async function signup(user: User) {
    const newUser = new User(user);
    try {
        const registeredUser = await userService.add(newUser);
        delete registeredUser.password;
        return resolve(registeredUser);
    } catch (err) {
        return reject(err);
    }
}