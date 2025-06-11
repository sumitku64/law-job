import mongoose from 'mongoose';

const internSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  schoolName: {
    type: String,
    required: true
  },
  currentYear: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  interests: [{
    type: String,
    enum: ['criminal', 'civil', 'corporate', 'family', 'taxation', 'property']
  }],
  resume: {
    type: String, // URL to uploaded document
    required: true
  },
  studentId: {
    type: String, // URL to uploaded document
    required: true
  },
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship'
  }],
  skills: [{
    type: String
  }],
  achievements: [{
    title: String,
    description: String,
    date: Date
  }],
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    url: String
  }]
}, {
  timestamps: true
});

const Intern = mongoose.model('Intern', internSchema);

export default Intern; 