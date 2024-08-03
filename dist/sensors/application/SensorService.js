"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorService = void 0;
const ws_1 = __importDefault(require("ws")); // Importa WebSocket client
const rabbitmq_1 = require("../../common/rabbitmq");
const WS_URL = 'ws://localhost:8080';
const wsClient = new ws_1.default(WS_URL);
class SensorService {
    constructor(sensorRepository) {
        this.sensorRepository = sensorRepository;
        // Asegúrate de que el WebSocket esté abierto antes de intentar enviar mensajes
        wsClient.on('open', () => {
            console.log('WebSocket connection established');
        });
        wsClient.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }
    saveSensorData(data, callback) {
        this.sensorRepository.saveSensorData(data, callback);
    }
    getSensorData(callback) {
        this.sensorRepository.getSensorData(callback);
    }
    startConsuming() {
        return __awaiter(this, void 0, void 0, function* () {
            const { connection, channel } = yield (0, rabbitmq_1.connectRabbitMQ)();
            const queue = 'mqtt';
            console.log(`Waiting for messages in ${queue}`);
            channel.consume(queue, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg !== null) {
                    const data = msg.content.toString();
                    try {
                        const sensorData = this.parseSensorData(data);
                        this.saveSensorData(sensorData, (error, results) => {
                            if (error) {
                                console.error('Error saving sensor data:', error);
                            }
                            else {
                                console.log('Sensor data saved:', results);
                                // Enviar los datos al servidor WebSocket
                                if (wsClient.readyState === ws_1.default.OPEN) {
                                    wsClient.send(JSON.stringify(sensorData));
                                }
                                else {
                                    console.error('WebSocket connection is not open');
                                }
                            }
                        });
                    }
                    catch (error) {
                        console.error('Error parsing sensor data:', error);
                    }
                    channel.ack(msg);
                }
            }));
        });
    }
    parseSensorData(data) {
        const parts = data.split(',').map(part => part.trim());
        const sensorData = {}; // Usa Partial para permitir campos opcionales
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
        // Asegúrate de que sensorData tenga todos los campos necesarios antes de devolverlo
        return sensorData;
    }
}
exports.SensorService = SensorService;
