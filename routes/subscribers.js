const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// GET all subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new subscriber
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    email: req.body.email
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a subscriber
router.delete('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) return res.status(404).json({ message: 'Cannot find subscriber' });
    await subscriber.remove();
    res.json({ message: 'Deleted subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
