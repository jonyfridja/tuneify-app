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
const bcrypt_1 = __importDefault(require("bcrypt"));
const util_service_1 = require("../../services/util.service");
const db_service_1 = __importDefault(require("../../services/db.service"));
const mongodb_1 = require("mongodb");
exports.default = {
    getByUsername,
    add,
    update
};
const _saltRounds = 10;
function getByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield _getCollection();
            const user = collection.findOne({ username });
            if (!user)
                throw new Error('User not found');
            return user;
        }
        catch (err) {
            console.log('user.service.js - getByUserName:\n', err);
        }
        //   return reject(resMessages.invalidCredentials);
    });
}
function add(newUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            newUser.password = yield bcrypt_1.default.hash(newUser.password, _saltRounds);
            const collection = yield _getCollection();
            // this intelisense is blowing my mind, one of the best reasons in favor of
            // adopting typescript
            yield collection.insertOne(newUser);
            return newUser;
            // newUser._id = makeId();
            // gUsers.push(newUser);
            // return resolve(newUser);
        }
        catch (err) {
            return util_service_1.reject(err);
        }
    });
}
function update(updatedUser) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { _id } = updatedUser;
            const collection = yield _getCollection();
            // Needs checking
            const res = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, Object.assign({}, updatedUser));
            return updatedUser;
            // newUser._id = makeId();
            // gUsers.push(newUser);
            // return resolve(newUser);
        }
        catch (err) {
            return util_service_1.reject(err);
        }
    });
}
function _getCollection() {
    return __awaiter(this, void 0, void 0, function* () {
        return db_service_1.default.getCollection(db_service_1.default.collections.user);
    });
}
//# sourceMappingURL=user.service.js.map