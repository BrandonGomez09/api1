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
exports.connectRabbitMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const RABBITMQ_URL = 'amqp://angel:angelgabriel@34.226.127.27:5672';
const QUEUE = 'mqtt';
const connectRabbitMQ = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield amqplib_1.default.connect(RABBITMQ_URL);
        const channel = yield connection.createChannel();
        yield channel.assertQueue(QUEUE, { durable: true });
        console.log('Connected to RabbitMQ');
        return { connection, channel };
    }
    catch (error) {
        console.error('Error connecting to RabbitMQ', error);
        throw error;
    }
});
exports.connectRabbitMQ = connectRabbitMQ;
