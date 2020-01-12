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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
// Connection URL
const url = process.env.NODE_ENV === 'production'
    ? 'mongodb+srv://theDbUser:camay2019@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority'
    : 'mongodb://localhost:27017';
// Database Name
const dbName = 'tuneify_db';
// throw new Error('set db name!');
var dbConn = null;
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        if (dbConn)
            return dbConn;
        try {
            const client = yield mongodb_1.MongoClient.connect(url, { useNewUrlParser: true });
            const db = client.db(dbName);
            dbConn = db;
            return db;
        }
        catch (err) {
            console.log('Cannot Connect to DB', err);
            throw err;
        }
    });
}
function getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield connect();
        return db.collection(collectionName);
    });
}
exports.default = {
    collections: {
        tune: 'tune',
        user: 'user'
    },
    getCollection
};
//# sourceMappingURL=db.service.js.map