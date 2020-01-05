import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';


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

app.use('/api/tune', tuneRouter);
app.use('/api', authRouter);

// app.get('/', (req, res) => {
//   try {
//     res.sendFile('./app/index.html');
//   } catch (err) {
//     res.status(401).json(err)
//   }
// })

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.listen(PORT, () => {
  console.log('listening at PORT:', PORT);
});
