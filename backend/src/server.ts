import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
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
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/tune', tuneRouter);

+app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log('listening at PORT:', PORT);
});
