"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors")); // Importa el middleware CORS
const SensorRouter_1 = __importDefault(require("./sensors/interfaces/SensorRouter"));
const UserRouter_1 = __importDefault(require("./users/interfaces/UserRouter"));
const SensorService_1 = require("./sensors/application/SensorService");
const MySQLSensorRepository_1 = require("./sensors/infrastructure/MySQLSensorRepository");
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // Añade el middleware CORS
app.use(body_parser_1.default.json());
app.use('/users', UserRouter_1.default);
app.use('/sensors', SensorRouter_1.default);
const sensorRepository = new MySQLSensorRepository_1.MySQLSensorRepository();
const sensorService = new SensorService_1.SensorService(sensorRepository);
// Inicia el consumo de mensajes de RabbitMQ
sensorService.startConsuming();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
