"use strict";
// src/repositories/UserRepository.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsername = exports.createUser = void 0;
var database_1 = __importDefault(require("../database"));
var createUser = function (user, callback) {
    database_1.default.query('INSERT INTO users SET ?', user, callback);
};
exports.createUser = createUser;
var findUserByUsername = function (username, callback) {
    database_1.default.query('SELECT * FROM users WHERE username = ?', [username], callback);
};
exports.findUserByUsername = findUserByUsername;
