import express from 'express';
import {
  getAllHalls,
  getHallById,
  createHall,
  updateHall,
  deleteHall
} from '../controllers/hallscontroller.js';

const router = express.Router();

// GET /api/halls - Get all halls (with optional location filter)
router.get('/', getAllHalls);

// GET /api/halls/:id - Get single hall by ID
router.get('/:id', getHallById);

// POST /api/halls - Create new hall
router.post('/', createHall);

// PUT /api/halls/:id - Update hall
router.put('/:id', updateHall);

// DELETE /api/halls/:id - Delete hall
router.delete('/:id', deleteHall);

export default router;
