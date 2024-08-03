import amqp, { Connection, Channel } from 'amqplib';

const RABBITMQ_URL = 'amqp://angel:angelgabriel@34.226.127.27:5672';
const QUEUE = 'mqtt';

export const connectRabbitMQ = async (): Promise<{ connection: Connection, channel: Channel }> => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE, { durable: true });
        console.log('Connected to RabbitMQ');
        return { connection, channel };
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
        throw error;
    }
};
