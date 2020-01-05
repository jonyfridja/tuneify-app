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
const util_service_1 = require("../../services/util.service");
const message_service_1 = require("../../services/message.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = {
    getByUsername,
    add
};
const _saltRounds = 10;
const gUsers = require('./users.json');
function getByUsername(username) {
    const user = gUsers.find(u => u.username === username);
    if (user)
        return util_service_1.resolve(user);
    return util_service_1.reject(message_service_1.resMessages.invalidCredentials);
}
function add(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            newUser.password = yield bcrypt_1.default.hash(newUser.password, _saltRounds);
            newUser._id = util_service_1.makeId();
            gUsers.push(newUser);
            return util_service_1.resolve(newUser);
        }
        catch (err) {
            return util_service_1.reject(err);
        }
    });
}
//# sourceMappingURL=user.service.js.map