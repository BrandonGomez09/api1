import { SensorData } from './SensorData';

export interface SensorRepository {
  saveSensorData(data: SensorData, callback: (error: any, results: any) => void): void;
  getSensorData(callback: (error: any, results: SensorData[]) => void): void;
}
