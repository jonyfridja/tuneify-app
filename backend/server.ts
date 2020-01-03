import express from 'express';
import tuneService from './services/tune.service';
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json(tuneService.query());
});

app.listen(PORT, () => {
  console.log('listening at PORT:', PORT);
});
