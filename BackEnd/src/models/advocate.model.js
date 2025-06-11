import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const advocateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  barCouncilId: {
    type: String,
    required: true,
    unique: true
  },
  lawDegree: {
    type: String, // URL to uploaded document
    required: true
  },
  specialization: {
    type: String,
    enum: ['criminal', 'civil', 'corporate', 'family', 'taxation', 'property', 'labor'],
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  fees: {
    type: Number,
    required: true,
    min: 0
  },
  bio: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  cases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case'
  }],
  availability: {
    type: Map,
    of: [{
      startTime: String,
      endTime: String
    }],
    default: new Map()
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Calculate average rating when a review is added
advocateSchema.pre('save', function(next) {
  if (this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = totalRating / this.reviews.length;
  }
  next();
});

advocateSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

advocateSchema.methods.comparePassword = async function(candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password);
};

const Advocate = mongoose.model('Advocate', advocateSchema);

export default Advocate; 