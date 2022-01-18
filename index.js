const express = require('express');
const cors = require('cors');
const { backPort } = require('./conf');
const commentsRoutes = require('./routes/comments');
const contentsRoutes = require('./routes/contents');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/comments', commentsRoutes);
app.use('/contents', contentsRoutes);

app.use('/', (req, res) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url} `);
});

app.listen(backPort, () => {
  console.log(`Server is now listening on port ${backPort}`);
});
