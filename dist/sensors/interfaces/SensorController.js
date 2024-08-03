"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSensorData = exports.saveSensorData = void 0;
const SensorService_1 = require("../application/SensorService");
const MySQLSensorRepository_1 = require("../infrastructure/MySQLSensorRepository");
const sensorService = new SensorService_1.SensorService(new MySQLSensorRepository_1.MySQLSensorRepository());
const saveSensorData = (req, res) => {
    const sensorData = req.body;
    sensorService.saveSensorData(sensorData, (error, results) => {
        if (error) {
            console.error('Error al guardar datos del sensor:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Datos del sensor guardados correctamente' });
    });
};
exports.saveSensorData = saveSensorData;
const getSensorData = (req, res) => {
    sensorService.getSensorData((error, results) => {
        if (error) {
            console.error('Error al obtener datos del sensor:', error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(200).json({ data: results });
    });
};
exports.getSensorData = getSensorData;
