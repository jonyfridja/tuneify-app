import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import tuneRouter from './routes/tune.route';

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

app.listen(PORT, () => {
  console.log('listening at PORT:', PORT);
});
