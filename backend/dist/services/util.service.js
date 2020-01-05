"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
function resolve(val) {
    return Promise.resolve(val);
}
exports.resolve = resolve;
function reject(val) {
    return Promise.reject(val);
}
exports.reject = reject;
function makeId(prefix = '', suffix = '') {
    return uniqid_1.default(prefix, suffix);
}
exports.makeId = makeId;
//# sourceMappingURL=util.service.js.map