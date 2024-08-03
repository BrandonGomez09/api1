import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; 
import sensorRouter from './sensors/interfaces/SensorRouter';
import userRouter from './users/interfaces/UserRouter';
import { SensorService } from './sensors/application/SensorService';
import { MySQLSensorRepository } from './sensors/infrastructure/MySQLSensorRepository';


const app = express();

app.use(cors()); 
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/sensors', sensorRouter);

const sensorRepository = new MySQLSensorRepository();
const sensorService = new SensorService(sensorRepository);


sensorService.startConsuming();

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
