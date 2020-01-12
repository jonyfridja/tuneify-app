import bcrypt = require('bcrypt');

import User from '../user/User';
import userService from '../user/user.service';
import { resMessages } from '../../services/message.service';

export default {
  login,
  signup
};

async function login({ username, password }: User) {
  if (!username || !password) throw resMessages.requiredCredentials;

  const user = await userService.getByUsername(username);
  if (!user) throw new Error(resMessages.invalidCredentials);

  const isPassGood = await bcrypt.compare(password, user.password);
  if (!isPassGood) return Promise.reject(resMessages.invalidCredentials);

  delete user.password;
  return user;
}

async function signup(user: User) {
  try {
    if (!user.username || !user.password) {
      throw new Error(resMessages.invalidCredentials);
    }

    const addedUser = await userService.add(user);
    delete addedUser.password;
    return addedUser;
  } catch (err) {
    throw err;
  }
}
