import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';


import tuneRouter from './routes/tune.route';
import authRouter from './routes/auth.route';

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/api/tune', tuneRouter);
app.use('/api', authRouter);

app.listen(PORT, () => {
  console.log('listening at PORT:', PORT);
});
