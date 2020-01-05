"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_service_1 = require("./util.service");
const message_service_1 = require("./message.service");
exports.default = {
    login,
    logout,
    signup
};
function login(credentials) {
    // never! ever! return the password
    delete credentials.password;
    return util_service_1.resolve(credentials);
}
function logout() {
    return util_service_1.resolve(message_service_1.resMessages.successLogout);
}
function signup(credentials) {
    return util_service_1.resolve(message_service_1.resMessages.successSignup);
}
//# sourceMappingURL=auth.service.js.map