import { ConsumeMessage } from 'amqplib';
import WebSocket from 'ws';
import { connectRabbitMQ } from '../../common/rabbitmq';
import { SensorData } from '../domain/SensorData';
import { SensorRepository } from '../domain/SensorRepository';

const WS_URL = 'ws://localhost:8080';
const wsClient = new WebSocket(WS_URL);

export class SensorService {
    constructor(private sensorRepository: SensorRepository) {
        wsClient.on('open', () => {
            console.log('WebSocket connection established');
        });

        wsClient.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }

    saveSensorData(data: SensorData, callback: (error: any, results: any) => void): void {
        this.sensorRepository.saveSensorData(data, callback);
    }

    getSensorData(callback: (error: any, results: SensorData[]) => void): void {
        this.sensorRepository.getSensorData(callback);
    }

    async startConsuming() {
        const { connection, channel } = await connectRabbitMQ();
        const queue = 'mqtt';

        console.log(`Waiting for messages in ${queue}`);

        channel.consume(queue, async (msg: ConsumeMessage | null) => {
            if (msg !== null) {
                const data = msg.content.toString();
                try {
                    const sensorData: SensorData = this.parseSensorData(data);
                    this.saveSensorData(sensorData, (error, results) => {
                        if (error) {
                            console.error('Error saving sensor data:', error);
                        } else {
                            console.log('Sensor data saved:', results);
                            if (wsClient.readyState === WebSocket.OPEN) {
                                wsClient.send(JSON.stringify(sensorData));
                            } else {
                                console.error('WebSocket connection is not open');
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error parsing sensor data:', error);
                }
                channel.ack(msg);
            }
        });
    }

    private parseSensorData(data: string): SensorData {
        const parts = data.split(',').map(part => part.trim());
        const sensorData: Partial<SensorData> = {}; 

        parts.forEach(part => {
            const [key, value] = part.split(':').map(p => p.trim());
            if (key && value) {
                switch (key) {
                    case 'Temp':
                        sensorData.temperature = parseFloat(value);
                        break;
                    case 'Hum':
                        sensorData.humidity = parseFloat(value);
                        break;
                    case 'Dist':
                        sensorData.distance = parseFloat(value);
                        break;
                }
            }
        });

        return sensorData as SensorData;
    }
}
