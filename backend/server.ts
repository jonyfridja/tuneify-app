import express from 'express';
const app = express();

console.log('express');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('hw');
});

app.listen(PORT, () => {
  console.log('listening at PORT:', PORT);
});
