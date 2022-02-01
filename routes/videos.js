const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [videos] = await db.query(`SELECT id, url, title FROM videos`);
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).send('Error retrieving the videos');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [videos] = await db.query(
      `SELECT id, url, title FROM videos WHERE id = ?`,
      [id]
    );
    if (videos.length) {
      res.status(200).json(videos);
    } else {
      res.status(404).send('Video not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving the video');
  }
});

router.post('/', async (req, res) => {
  try {
    const { url, title } = req.body;
    await db.query(`INSERT INTO videos (url, title) VALUES (?, ?)`, [
      url,
      title,
    ]);
    res.status(201).send('Video created');
  } catch (err) {
    res.status(500).send('Error creating the video');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM videos WHERE id = ?`, [id]);
    res.status(200).send('Video succesfully deleted');
  } catch (err) {
    res.status(500).send('Error deleting the video');
  }
});

module.exports = router;
