const express = require('express');
const { checkWin } = require('../carddGame');
const Winn = require('../models/WinSchema');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const winn = await Winn.find();
    res.json(winn);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const oneGame = await Winn.findById(req.params.id);
    res.json(oneGame);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/', async (req, res) => {
  if (req.body.name && !Array.isArray(req.body.name)) {
    return res.send('Value should be array');
  }
  if (!req.body.name && !Array.isArray(req.body)) {
    return res.send('input should be [{"name": "player_name", "cards": [cards] * 3}]');
  }
  const winn = new Winn({
    game: checkWin(req.body),
  });
  try {
    const savedWin = await winn.save();
    res.json(savedWin);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
