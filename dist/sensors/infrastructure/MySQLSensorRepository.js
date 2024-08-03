"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLSensorRepository = void 0;
const database_1 = __importDefault(require("../../common/database"));
class MySQLSensorRepository {
    saveSensorData(data, callback) {
        const { humidity, temperature, distance } = data;
        const query = 'INSERT INTO sensores (humidity, temperature, distance) VALUES (?, ?, ?)';
        const values = [humidity, temperature, distance];
        database_1.default.query(query, values, callback);
    }
    getSensorData(callback) {
        const query = 'SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 100';
        database_1.default.query(query, callback);
    }
}
exports.MySQLSensorRepository = MySQLSensorRepository;
