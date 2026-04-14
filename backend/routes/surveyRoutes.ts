import { Router } from 'express';
import { surveyController } from '../controllers/surveyController.js';

const router = Router();

// Survey management routes
router.get('/', surveyController.getAll);
router.post('/submit', surveyController.submitResponse);
router.get('/:id', surveyController.getById);
router.post('/', surveyController.create);
router.put('/:id', surveyController.update);
router.delete('/:id', surveyController.delete);

export default router;
