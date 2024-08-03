"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLUserRepository = void 0;
const database_1 = __importDefault(require("../../common/database"));
class MySQLUserRepository {
    createUser(user, callback) {
        database_1.default.query('INSERT INTO users SET ?', user, callback);
    }
    findUserByUsername(username, callback) {
        database_1.default.query('SELECT * FROM users WHERE username = ?', [username], callback);
    }
}
exports.MySQLUserRepository = MySQLUserRepository;
