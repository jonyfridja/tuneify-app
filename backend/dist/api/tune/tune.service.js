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
const db_service_1 = __importDefault(require("../../services/db.service"));
const mongodb_1 = require("mongodb");
const gTunes = require('./tunes.json');
exports.default = {
    query,
    getById,
    update,
    removeById,
    add
};
function query(filterBy = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const criteria = {};
        if (filterBy.txt) {
            // ...
        }
        try {
            const collection = yield _getCollection();
            return yield collection.find({}).toArray();
        }
        catch (err) {
            console.log('err', err);
            throw err;
        }
    });
}
function getById(_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield _getCollection();
        try {
            const tune = collection.findOne({ _id });
            if (!tune)
                throw new Error('Tune not found');
            return tune;
        }
        catch (err) {
            console.log('tune.service.js - getById:\n', err);
            throw err;
        }
    });
}
function update(tune) {
    return __awaiter(this, void 0, void 0, function* () {
        const { _id } = tune;
        const collection = yield _getCollection();
        // Needs checking
        try {
            const res = yield collection.findOneAndUpdate({ _id: new mongodb_1.ObjectId(_id) }, Object.assign({}, tune));
            return tune;
        }
        catch (err) { }
    });
}
function removeById(id) {
    const idx = gTunes.findIndex(t => t._id === id);
    if (idx === -1)
        return util_service_1.reject(message_service_1.resMessages.unknownId);
    gTunes.splice(idx, 1);
    return util_service_1.resolve(message_service_1.resMessages.successRemove);
}
function add(tune) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield _getCollection();
        // Needs checking
        try {
            const res = yield collection.insertOne(tune);
            return tune;
        }
        catch (err) { }
    });
}
function _getCollection(collectionName = db_service_1.default.collections.tune) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_service_1.default.getCollection(collectionName);
    });
}
//# sourceMappingURL=tune.service.js.map