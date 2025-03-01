const express = require('express');
const router = express.Router();
const Completed = require('../models/Completed');

// GET all completed challenges
router.get('/', async (req, res) => {
  try {
    const completeds = await Completed.find();
    res.json(completeds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific completed challenge
router.get('/:id', getCompleted, (req, res) => {
  res.json(res.completed);
});

// CREATE a completed challenge record
router.post('/', async (req, res) => {
  const completed = new Completed({
    challengerName: req.body.challengerName,
    personName: req.body.personName,
    position: req.body.position,
    linkedinProfile: req.body.linkedinProfile,
    description: req.body.description,
    fundingAmount: req.body.fundingAmount,
    image: req.body.image // <-- New field
  });
  try {
    const newCompleted = await completed.save();
    res.status(201).json(newCompleted);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a completed challenge record
router.put('/:id', getCompleted, async (req, res) => {
  if (req.body.challengerName != null) res.completed.challengerName = req.body.challengerName;
  if (req.body.personName != null) res.completed.personName = req.body.personName;
  if (req.body.position != null) res.completed.position = req.body.position;
  if (req.body.linkedinProfile != null) res.completed.linkedinProfile = req.body.linkedinProfile;
  if (req.body.description != null) res.completed.description = req.body.description;
  if (req.body.fundingAmount != null) res.completed.fundingAmount = req.body.fundingAmount;
  if (req.body.image != null) res.completed.image = req.body.image; // <-- New field

  try {
    const updatedCompleted = await res.completed.save();
    res.json(updatedCompleted);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a completed challenge record
router.delete('/:id', getCompleted, async (req, res) => {
  try {
    await res.completed.remove();
    res.json({ message: 'Deleted completed challenge' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get completed challenge by ID
async function getCompleted(req, res, next) {
  let completed;
  try {
    completed = await Completed.findById(req.params.id);
    if (completed == null) {
      return res.status(404).json({ message: 'Cannot find completed challenge' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.completed = completed;
  next();
}

module.exports = router;
