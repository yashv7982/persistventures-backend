const express = require('express');
const router = express.Router();
const Founder = require('../models/Founder');

// GET all founders
router.get('/', async (req, res) => {
  try {
    const founders = await Founder.find();
    res.json(founders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific founder
router.get('/:id', getFounder, (req, res) => {
  res.json(res.founder);
});

// CREATE a new founder
router.post('/', async (req, res) => {
  const founder = new Founder({
    name: req.body.name,
    position: req.body.position,
    description: req.body.description,
    linkedinProfile: req.body.linkedinProfile,
    image: req.body.image // <-- New field
  });
  try {
    const newFounder = await founder.save();
    res.status(201).json(newFounder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a founder
router.put('/:id', getFounder, async (req, res) => {
  if (req.body.name != null) res.founder.name = req.body.name;
  if (req.body.position != null) res.founder.position = req.body.position;
  if (req.body.description != null) res.founder.description = req.body.description;
  if (req.body.linkedinProfile != null) res.founder.linkedinProfile = req.body.linkedinProfile;
  if (req.body.image != null) res.founder.image = req.body.image; // <-- New field

  try {
    const updatedFounder = await res.founder.save();
    res.json(updatedFounder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a founder
router.delete('/:id', getFounder, async (req, res) => {
  try {
    await res.founder.remove();
    res.json({ message: 'Deleted founder' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get founder by ID
async function getFounder(req, res, next) {
  let founder;
  try {
    founder = await Founder.findById(req.params.id);
    if (founder == null) {
      return res.status(404).json({ message: 'Cannot find founder' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.founder = founder;
  next();
}

module.exports = router;
