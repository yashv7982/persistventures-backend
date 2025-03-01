const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// GET all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific challenge
router.get('/:id', getChallenge, (req, res) => {
  res.json(res.challenge);
});

// CREATE a new challenge
router.post('/', async (req, res) => {
  const challenge = new Challenge({
    logo: req.body.logo,
    title: req.body.title,
    fundingAmount: req.body.fundingAmount,
    description: req.body.description,
    deadline: req.body.deadline
  });
  try {
    const newChallenge = await challenge.save();
    res.status(201).json(newChallenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a challenge

router.put('/:id', getChallenge, async (req, res) => {
  if (req.body.logo != null) res.challenge.logo = req.body.logo;
  if (req.body.title != null) res.challenge.title = req.body.title;
  if (req.body.fundingAmount != null) res.challenge.fundingAmount = req.body.fundingAmount;
  if (req.body.description != null) res.challenge.description = req.body.description;
  if (req.body.deadline != null) res.challenge.deadline = req.body.deadline;
  if (req.body.visible !== undefined) res.challenge.visible = req.body.visible; // <-- Add this line
  
  try {
    const updatedChallenge = await res.challenge.save();
    res.json(updatedChallenge);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE a challenge
router.delete('/:id', getChallenge, async (req, res) => {
  try {
    await res.challenge.remove();
    res.json({ message: 'Deleted challenge' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get challenge by ID
async function getChallenge(req, res, next) {
  let challenge;
  try {
    challenge = await Challenge.findById(req.params.id);
    if (challenge == null) return res.status(404).json({ message: 'Cannot find challenge' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.challenge = challenge;
  next();
}

module.exports = router;
