import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import tuneRouter from './api/tune/tune.route';
import authRouter from './api/auth/auth.route';

const app = express();


var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions));

app.use(session({
  secret: 'tunes are awesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/tune', tuneRouter);
app.use('/api/auth', authRouter);

app.use(express.static('public'));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log('VERSION: 0.1.1');
  console.log('listening at PORT:', PORT);
});
