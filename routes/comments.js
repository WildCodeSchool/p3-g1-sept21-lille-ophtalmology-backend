const express = require('express');
const { db } = require('../conf');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [comments] = await db.query(
      `SELECT id, message, authorName, date, idPages, idParent FROM comments`
    );
    if (comments.length) {
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
      `SELECT id, message, authorName, date, idPages, idParent FROM comments WHERE id = ?`,
      [id]
    );
    if (comments.length) {
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
    const { message, authorName, idPages, idParent } = req.body;
    await db.query(
      `INSERT INTO comments (message, authorName, idPages, idParent, date) VALUES (?, ?, ?, ?, NOW())`,
      [message, authorName, idPages, idParent]
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
    res.status(200).send('Comment succesfully deleted');
  } catch (err) {
    res.status(500).send('Error deleting the comment');
  }
});

module.exports = router;
