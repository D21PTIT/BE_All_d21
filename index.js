import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import song from './routers/song.js';
import dotenv from 'dotenv';
import mqtt from 'mqtt'; // Thêm mqtt
import { saveMessage } from './controllers/TestMQTTApi.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/', song);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Cannot connect to MongoDB', err);
    });

// Khởi tạo MQTT client và kết nối tới MQTT broker
const mqttClient = mqtt.connect({
    host: 'localhost',
    port: 2003,
    username: 'kien',
    password: '123456'
});

// Lắng nghe sự kiện 'connect' của MQTT client
mqttClient.on('connect', () => {
    console.log('MQTT Connected');
    // Subscribe tới topic 'kien'
    mqttClient.subscribe('kien', (err) => {
        if (err) {
            console.error('Failed to subscribe:', err);
        } else {
            console.log('Subscribed to topic "kien"');
        }
    });
});

// Lắng nghe sự kiện 'message' để nhận tin nhắn từ MQTT
mqttClient.on('message', (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    saveMessage(topic, message.toString());  // Hàm saveMessage cần được định nghĩa
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
