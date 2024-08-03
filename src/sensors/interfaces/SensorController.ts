import { Request, Response } from 'express';
import { SensorService } from '../application/SensorService';
import { SensorData } from '../domain/SensorData';
import { MySQLSensorRepository } from '../infrastructure/MySQLSensorRepository';

const sensorService = new SensorService(new MySQLSensorRepository());

export const saveSensorData = (req: Request, res: Response) => {
  const sensorData: SensorData = req.body;

  sensorService.saveSensorData(sensorData, (error, results) => {
    if (error) {
      console.error('Error al guardar datos del sensor:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.status(201).json({ message: 'Datos del sensor guardados correctamente' });
  });
};

export const getSensorData = (req: Request, res: Response) => {
  sensorService.getSensorData((error, results) => {
    if (error) {
      console.error('Error al obtener datos del sensor:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.status(200).json({ data: results });
  });
};
