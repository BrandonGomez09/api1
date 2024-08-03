"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var connection = mysql_1.default.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gomezbga09',
    database: 'multi',
});
connection.connect(function (error) {
    if (error) {
        console.error('Error al conectar a MySQL:', error);
        return;
    }
    console.log('Conectado a MySQL correctamente');
});
exports.default = connection;
