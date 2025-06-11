import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import Advocate from '../models/advocate.model.js';

const router = express.Router();

// @route   GET /api/advocates
// @desc    Get all advocates
// @access  Public
router.get('/', async (req, res) => {
  try {
    const advocates = await Advocate.find().populate('user', '-password');
    res.json(advocates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/advocates/:id
// @desc    Get advocate by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const advocate = await Advocate.findById(req.params.id).populate('user', '-password');
    if (!advocate) {
      return res.status(404).json({ message: 'Advocate not found' });
    }
    res.json(advocate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/advocates/profile
// @desc    Update advocate profile
// @access  Private
router.put('/profile', protect, authorize('advocate'), async (req, res) => {
  try {
    const advocate = await Advocate.findOne({ user: req.user._id });
    if (!advocate) {
      return res.status(404).json({ message: 'Advocate profile not found' });
    }

    const { specialization, experience, fees, bio } = req.body;

    advocate.specialization = specialization || advocate.specialization;
    advocate.experience = experience || advocate.experience;
    advocate.fees = fees || advocate.fees;
    advocate.bio = bio || advocate.bio;

    const updatedAdvocate = await advocate.save();
    res.json(updatedAdvocate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/advocates/:id/reviews
// @desc    Add review for advocate
// @access  Private
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const advocate = await Advocate.findById(req.params.id);

    if (!advocate) {
      return res.status(404).json({ message: 'Advocate not found' });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    advocate.reviews.push(review);
    await advocate.save();

    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 