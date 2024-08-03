  import { SensorRepository } from '../domain/SensorRepository';
  import { SensorData } from '../domain/SensorData';
  import connection from '../../common/database';

  export class MySQLSensorRepository implements SensorRepository {
      saveSensorData(data: SensorData, callback: (error: any, results: any) => void): void {
          const { humidity, temperature, distance } = data; 
          const query = 'INSERT INTO sensores (humidity, temperature, distance) VALUES (?, ?, ?)';
          const values = [humidity, temperature, distance];
          connection.query(query, values, callback);
      }

      getSensorData(callback: (error: any, results: SensorData[]) => void): void {
          const query = 'SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 100';
          connection.query(query, callback);
      }
  }
