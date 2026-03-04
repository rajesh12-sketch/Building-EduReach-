import express from 'express';
import { getPrograms, getProgramBySlug } from '../controllers/program.controller.js';

const router = express.Router();

router.route('/').get(getPrograms);
router.route('/:sectorName').get(getProgramBySlug);

export default router;
