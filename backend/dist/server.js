"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const tune_route_1 = __importDefault(require("./api/tune/tune.route"));
const auth_route_1 = __importDefault(require("./api/auth/auth.route"));
const app = express_1.default();
var corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true
};
app.use(cors_1.default(corsOptions));
app.use(express_session_1.default({
    secret: 'tunes are awesome',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.use('/api/tune', tune_route_1.default);
app.use('/api', auth_route_1.default);
// app.get('/', (req, res) => {
//   try {
//     res.sendFile('./app/index.html');
//   } catch (err) {
//     res.status(401).json(err)
//   }
// })
app.use(express_1.default.static('public'));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('VERSION: 0.1.1');
    console.log('listening at PORT:', PORT);
});
//# sourceMappingURL=server.js.map