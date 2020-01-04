import { resolve, reject } from "./util.service"
import User from "../models/User";
import { resMessages } from "./message.service";

export default {
    login,
    logout,
    signup
}

function login(credentials: User) {
    // never! ever! return the password
    delete credentials.password;
    return resolve(credentials);
}

function logout() {
    return resolve(resMessages.successLogout);
}

function signup() {
    return resolve(resMessages.successSignup);
}