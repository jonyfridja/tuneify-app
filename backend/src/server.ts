import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

import tuneRouter from './api/tune/tune.route';
import authRouter from './api/auth/auth.route';

const app = express();

app.use(session({
  secret: 'tunes are awesome',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(bodyParser.json());

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/tune', tuneRouter);
app.use('/api', authRouter);

// app.get('/', (req, res) => {
//   try {
//     res.sendFile('./app/index.html');
//   } catch (err) {
//     res.status(401).json(err)
//   }
// })

+app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('listening at PORT:', PORT);
});
