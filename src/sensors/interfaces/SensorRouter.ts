import { Router } from 'express';
import * as SensorController from '../interfaces/SensorController';

const router = Router();


router.post('/', SensorController.saveSensorData); 
router.get('/', SensorController.getSensorData); 

export default router;
