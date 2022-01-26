const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [contents] = await db.query(
      `SELECT id, title, text, idPages FROM contents`
    );
    if (contents.length) {
      res.status(200).json(contents);
    } else {
      res.status(404).send('Contents not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving the contents');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [contents] = await db.query(
      `SELECT id, title, text, idPages FROM contents WHERE id = ?`,
      [id]
    );
    if (contents.length) {
      res.status(200).json(contents);
    } else {
      res.status(404).send('Content not found');
    }
  } catch (err) {
    res.status(500).status('Error retrieving the content');
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, text, idPages } = req.body;
    await db.query(
      `INSERT INTO contents (title, text, idPages) VALUES (?, ?, ?)`,
      [title, text, idPages]
    );
    res.status(201).send('Content created');
  } catch (err) {
    res.status(500).send('Error creating the content');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, text, idPages } = req.body;
    await db.query(
      `UPDATE contents SET title = ?, text = ?, idPages = ? WHERE id = ?`,
      [title, text, idPages, id]
    );
    res.status(201).send('Content succesfully updated');
  } catch (err) {
    res.status(500).send('Error updating the content');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM contents WHERE id = ?`, [id]);
    res.status(200).send('Content succesfully deleted');
  } catch (err) {
    res.status(500).send('Error deleting the content');
  }
});

module.exports = router;
