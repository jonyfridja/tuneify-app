"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const tune_route_1 = __importDefault(require("./routes/tune.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = express_1.default();
app.use(express_session_1.default({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 3000;
app.use('/api/tune', tune_route_1.default);
app.use('/api', auth_route_1.default);
app.listen(PORT, () => {
    console.log('listening at PORT:', PORT);
});
//# sourceMappingURL=server.js.map