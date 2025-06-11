import User from '../models/user.model.js';
import Advocate from '../models/advocate.model.js';
import Intern from '../models/intern.model.js';
import Client from '../models/client.model.js';
import { generateToken } from '../utils/generateToken.js';
import fs from 'fs';
import path from 'path';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Fix: Create uploads directory in the correct location (root of BackEnd folder)
    const uploadsDir = path.join(process.cwd(), '..', 'uploads');
    console.log('Uploads directory path:', uploadsDir);
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('Created uploads directory at:', uploadsDir);
    }

    // Parse the JSON data from the form
    let formData;
    try {
      formData = JSON.parse(req.body.data);
      console.log('Parsed form data:', formData);
    } catch (error) {
      console.error('Error parsing form data:', error);
      return res.status(400).json({ message: 'Invalid form data' });
    }

    // Get file paths from multer and fix the paths
    const files = req.files || {};
    console.log('Received files:', files);
    
    // Add file paths to userData with correct path
    if (files.idProofFront) {
      const relativePath = path.relative(process.cwd(), files.idProofFront[0].path);
      formData.idProofFront = relativePath.replace(/\\/g, '/');
      console.log('ID Proof Front path:', formData.idProofFront);
    } else {
      console.log('No ID proof front file found');
      return res.status(400).json({ message: 'ID proof front is required' });
    }

    if (files.idProofBack && formData.idType === 'aadhaar') {
      const relativePath = path.relative(process.cwd(), files.idProofBack[0].path);
      formData.idProofBack = relativePath.replace(/\\/g, '/');
      console.log('ID Proof Back path:', formData.idProofBack);
    }

    // Check if user exists
    const userExists = await User.findOne({ email: formData.email });
    if (userExists) {
      // Clean up uploaded files if user exists
      Object.values(files).forEach(fileArray => {
        fileArray.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      });
      return res.status(400).json({ message: 'User already exists' });
    }

    try {
      // Create user with all necessary fields
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        idType: formData.idType,
        idProofFront: formData.idProofFront,
        idProofBack: formData.idProofBack,
        userType: formData.userType // Ensure userType is included
      };

      console.log('Creating user with data:', userData);
      const user = await User.create(userData);

      // Create specific profile based on user type
      if (formData.userType === 'advocate') {
        const advocateData = {
          user: user._id,
          barCouncilId: formData.barCouncilId,
          specialization: formData.specialization,
          experience: formData.experience,
          fees: formData.fees,
          bio: formData.bio,
          password: formData.password
        };

        if (files.lawDegree) {
          const relativePath = path.relative(process.cwd(), files.lawDegree[0].path);
          advocateData.lawDegree = relativePath.replace(/\\/g, '/');
        }

        await Advocate.create(advocateData);
      } else if (formData.userType === 'intern') {
        const internData = {
          user: user._id,
          schoolName: formData.schoolName,
          currentYear: formData.experience,
          interests: formData.specialization
        };

        if (files.studentId) {
          const relativePath = path.relative(process.cwd(), files.studentId[0].path);
          internData.studentId = relativePath.replace(/\\/g, '/');
        }
        if (files.resume) {
          const relativePath = path.relative(process.cwd(), files.resume[0].path);
          internData.resume = relativePath.replace(/\\/g, '/');
        }

        await Intern.create(internData);
      } else if (formData.userType === 'client') {
        const clientData = {
          user: user._id,
          occupation: formData.occupation || 'Not Specified',
          companyName: formData.companyName || '',
          preferredLanguages: formData.preferredLanguages || ['English'],
          budget: formData.budget || 0,
          preferredLocation: formData.preferredLocation || formData.city,
          caseType: formData.caseType || 'civil'
        };

        await Client.create(clientData);
      }

      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        token: generateToken(user._id),
      });
    } catch (error) {
      // Clean up uploaded files if user creation fails
      Object.values(files).forEach(fileArray => {
        fileArray.forEach(file => {
          fs.unlink(file.path, (err) => {
            if (err) console.error('Error deleting file:', err);
          });
        });
      });
      throw error;
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 