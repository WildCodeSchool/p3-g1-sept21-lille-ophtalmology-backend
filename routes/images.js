const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [images] = await db.query(`SELECT id, url, title FROM images`);
    if (images.length) {
      res.status(200).json(images);
    } else {
      res.status(404).send('Images not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving the images');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [images] = await db.query(
      `SELECT id, url, title FROM images WHERE id = ?`,
      [id]
    );
    if (images.length) {
      res.status(200).json(images);
    } else {
      res.status(404).send('Images not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving the image');
  }
});

router.post('/', async (req, res) => {
  try {
    const { url, title } = req.body;
    await db.query(`INSERT INTO images (url, title) VALUES (?, ?)`, [
      url,
      title,
    ]);
    res.status(201).send('Image created');
  } catch (err) {
    res.status(500).send('Error creating the image');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM images WHERE id = ?`, [id]);
    res.status(200).send('Image succesfully deleted');
  } catch (err) {
    res.status(500).send('Error deleting the image');
  }
});

module.exports = router;
