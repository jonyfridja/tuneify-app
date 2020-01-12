"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const user_service_1 = __importDefault(require("../user/user.service"));
const message_service_1 = require("../../services/message.service");
exports.default = {
    login,
    signup
};
function login({ username, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username || !password)
            throw message_service_1.resMessages.requiredCredentials;
        const user = yield user_service_1.default.getByUsername(username);
        if (!user)
            throw new Error(message_service_1.resMessages.invalidCredentials);
        const isPassGood = yield bcrypt.compare(password, user.password);
        if (!isPassGood)
            return Promise.reject(message_service_1.resMessages.invalidCredentials);
        delete user.password;
        return user;
    });
}
function signup(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!user.username || !user.password) {
                throw new Error(message_service_1.resMessages.invalidCredentials);
            }
            const addedUser = yield user_service_1.default.add(user);
            delete addedUser.password;
            return addedUser;
        }
        catch (err) {
            throw err;
        }
    });
}
//# sourceMappingURL=auth.service.js.map