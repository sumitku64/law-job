import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  occupation: {
    type: String,
    required: true,
    default: 'Not Specified'
  },
  companyName: {
    type: String,
    required: false,
    default: ''
  },
  caseHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case'
  }],
  preferredLanguages: {
    type: [String],
    enum: ['English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'],
    default: ['English']
  },
  budget: {
    type: Number,
    required: false,
    default: 0,
    min: 0
  },
  preferredLocation: {
    type: String,
    required: false
  },
  caseType: {
    type: String,
    enum: ['criminal', 'civil', 'corporate', 'family', 'taxation', 'property', 'labor'],
    default: 'civil',
    required: false
  }
}, {
  timestamps: true
});

const Client = mongoose.model('Client', clientSchema);

export default Client; 