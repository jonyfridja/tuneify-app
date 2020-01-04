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
const express_1 = __importDefault(require("express"));
const tune_service_1 = __importDefault(require("../services/tune.service"));
const message_service_1 = require("../services/message.service");
const router = express_1.default.Router();
// LIST
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tunes = yield tune_service_1.default.query();
        res.json(tunes);
    }
    catch (err) {
        res.status(401).json(err);
    }
}));
// READ
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tune = yield tune_service_1.default.getById(id);
        res.json(tune);
    }
    catch (err) {
        res.status(401).json(err);
    }
}));
// CREATE
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTune = req.body;
    try {
        const addedTune = yield tune_service_1.default.add(newTune);
        res.status(201).json(addedTune);
    }
    catch (err) {
        // TODO: message service can mb help me diagnose the err.message and return the code?
        let code = 500;
        if (err.message === message_service_1.resMessages.unknownId)
            code = 401;
        else
            res.status(code).json(err);
    }
}));
// UPDATE
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // TODO: ask yaron why, you do this rest
    const tuneToUpdate = req.body;
    try {
        const updatedTune = yield tune_service_1.default.update(tuneToUpdate);
        res.json(updatedTune);
    }
    catch (err) {
        let code = 500;
        if (err.message === message_service_1.resMessages.unknownId)
            code = 401;
        else
            res.status(code).json(err);
    }
}));
// REMOVE
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const msg = yield tune_service_1.default.removeById(id);
        res.json({ msg });
    }
    catch (err) {
        res.status(404).json({ err });
    }
}));
exports.default = router;
//# sourceMappingURL=tune.route.js.map