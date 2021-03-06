"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tune_1 = __importDefault(require("../models/Tune"));
const util_service_1 = require("./util.service");
const message_service_1 = require("./message.service");
const gTunes = require('./tunes.json');
exports.default = {
    query,
    getById,
    update,
    removeById,
    add
};
function query(filterBy = {}) {
    return util_service_1.resolve([...gTunes]);
}
function getById(id) {
    const tune = gTunes.find(t => t._id === id);
    if (tune)
        return util_service_1.resolve(tune);
    return util_service_1.reject(message_service_1.resMessages.wrondId);
}
function update(tune) {
    const idx = gTunes.findIndex(t => t._id === tune._id);
    if (idx === -1)
        return util_service_1.reject(message_service_1.resMessages.wrondId);
    let tuneToUpdate = gTunes.find(t => t._id === tune._id);
    //  new Tune filters unwanted properies - clean data, happy data
    tuneToUpdate = new Tune_1.default(tune);
    gTunes.splice(idx, 1, tuneToUpdate);
    return util_service_1.resolve(Object.assign({}, tuneToUpdate));
}
function removeById(id) {
    const idx = gTunes.findIndex(t => t._id === id);
    if (idx === -1)
        return util_service_1.reject(message_service_1.resMessages.unknownId);
    gTunes.splice(idx, 1);
    return util_service_1.resolve(message_service_1.resMessages.successRemove);
}
function add(tune) {
    const tuneToAdd = new Tune_1.default(tune);
    tuneToAdd._id = util_service_1.makeId();
    gTunes.push(tuneToAdd);
    return util_service_1.resolve(tuneToAdd);
}
//# sourceMappingURL=tune.service.js.map