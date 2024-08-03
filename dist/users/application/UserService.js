"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const MySQLUserRepository_1 = require("../infraestructure/MySQLUserRepository");
const userRepository = new MySQLUserRepository_1.MySQLUserRepository();
const registerUser = (user, callback) => {
    userRepository.createUser(user, callback);
};
exports.registerUser = registerUser;
const loginUser = (username, callback) => {
    userRepository.findUserByUsername(username, callback);
};
exports.loginUser = loginUser;
