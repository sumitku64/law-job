import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import Client from '../models/client.model.js';

const router = express.Router();

// @route   GET /api/clients
// @desc    Get all clients
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const clients = await Client.find().populate('user', '-password');
    res.json(clients);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/clients/:id
// @desc    Get client by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).populate('user', '-password');
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/clients/:id
// @desc    Update client profile
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Ensure user can only update their own profile
    if (client.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('user', '-password');

    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router; 