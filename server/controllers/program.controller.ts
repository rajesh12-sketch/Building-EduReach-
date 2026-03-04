import { Request, Response } from 'express';
import { Sector } from '../models/Program.js';
import { programSectors } from '../../src/data/programs.js';

// @desc    Seed programs data
// @route   POST /api/programs/seed (or called internally)
// @access  Public
export const seedPrograms = async () => {
  try {
    console.log('Seeding programs data...');
    // Clear existing data to ensure updates (like new courses) are applied
    await Sector.deleteMany({});
    await Sector.insertMany(programSectors);
    console.log('Programs data seeded successfully.');
  } catch (error) {
    console.error('Error seeding programs:', error);
  }
};

// @desc    Get all programs/sectors
// @route   GET /api/programs
// @access  Public
export const getPrograms = async (req: Request, res: Response) => {
  try {
    const sectors = await Sector.find({});
    res.json(sectors);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a specific program/sector by slug
// @route   GET /api/programs/:sectorName
// @access  Public
export const getProgramBySlug = async (req: Request, res: Response) => {
  try {
    const sector = await Sector.findOne({ slug: req.params.sectorName });
    if (sector) {
      res.json(sector);
    } else {
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
