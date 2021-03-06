const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const { backPort, frontUrl } = require('./conf');
const commentsRoutes = require('./routes/comments');
const contentsRoutes = require('./routes/contents');
const videosRoutes = require('./routes/videos');
const imagesRoutes = require('./routes/images');
const authRoutes = require('./routes/auth');
const miscRoutes = require('./routes/misc');

const app = express();
app.use(cors({ credentials: true, origin: { frontUrl } }));
app.use(passport.initialize());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/comments', commentsRoutes);
app.use('/contents', contentsRoutes);
app.use('/videos', videosRoutes);
app.use('/images', imagesRoutes);
app.use('/auth', authRoutes);
app.use('/', miscRoutes);

app.use('/', (req, res) => {
  res.status(404).send(`Route not found: ${req.method} ${req.url} `);
});

app.listen(backPort, () => {
  console.log(`Server is now listening on port ${backPort}`);
});
