import { Response } from 'express';
import { Application } from '../models/Application.js';
import { AuthRequest } from '../middleware/auth.middleware.js';

// @desc    Submit a new course application
// @route   POST /api/applications
// @access  Private
export const submitApplication = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId, courseName, fullName, email, phone, education, statement } = req.body;
    
    // Check if user already applied to this course
    const existingApp = await Application.findOne({ user: req.user?._id, courseId });
    if (existingApp) {
      return res.status(400).json({ message: 'You have already applied for this course.' });
    }

    const newApp = new Application({
      user: req.user?._id,
      courseId,
      courseName,
      fullName,
      email,
      phone,
      education,
      statement
    });
    
    await newApp.save();
    res.status(201).json(newApp);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's applications
// @route   GET /api/applications
// @access  Private
export const getMyApplications = async (req: AuthRequest, res: Response) => {
  try {
    const apps = await Application.find({ user: req.user?._id }).sort({ appliedAt: -1 });
    res.json(apps);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
