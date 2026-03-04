import express from 'express';
import { submitApplication, getMyApplications } from '../controllers/application.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .post(protect, submitApplication)
  .get(protect, getMyApplications);

export default router;
