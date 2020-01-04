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
const util_1 = require("util");
const auth_service_1 = __importDefault(require("../services/auth.service"));
const message_service_1 = require("../services/message.service");
const router = express_1.default.Router();
// LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // not already logged in!
    // src for chosing 409 https://www.shorturl.at/npBCT
    if (req.session.loggedInUser)
        return res.status(409).send(message_service_1.resMessages.alreadyLoggedIn);
    const credentials = req.body;
    try {
        const approvedCredentials = yield auth_service_1.default.login(credentials);
        req.session.loggedInUser = approvedCredentials;
        res.json(approvedCredentials);
    }
    catch (err) {
        // TODO: handle unauthed users
    }
}));
router.post('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // not already logged in!
    // src for chosing 409 https://www.shorturl.at/npBCT
    if (!req.session.loggedInUser)
        return res.status(409).send(message_service_1.resMessages.invalidLogout);
    let sessionDestroy = util_1.promisify(req.session.destroy);
    try {
        yield sessionDestroy();
        res.send(message_service_1.resMessages.successLogout);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// router.post('/signup', async (req, res) => {
//     const newCredentials = req.body;
//     try {
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })
exports.default = router;
//# sourceMappingURL=auth.route.js.map