const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [comments] = await db.query(
      `SELECT comment, authorName, date FROM comments`
    );
    if (res.length) {
      res.status(200).json(comments);
    } else {
      res.status(404).send('Comments not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving the comments');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [comments] = await db.query(
      `SELECT comment, authorName, date FROM comments WHERE id = ?`,
      [id]
    );
    if (res.length) {
      res.status(200).json(comments);
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (err) {
    res.status(500).send('Error retrieving the comment');
  }
});

router.post('/', async (req, res) => {
  try {
    const { comment, authorName, idPages } = req.body;
    await db.query(
      `INSERT INTO comments (comment, authorName, idPages, date) VALUES (?, ?, ?, NOW())`,
      [comment, authorName, idPages]
    );
    res.status(201).send('Comment created');
  } catch (err) {
    res.status(500).send('Error creating the comment');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM comments WHERE id = ?`, [id]);
    if (res.length) {
      res.status(200).send('Comment succesfully deleted');
    } else {
      res.status(404).send('Comment not found');
    }
  } catch (err) {
    res.status(500).send('Error deleting the comment');
  }
});

module.exports = router;
