import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import 'reflect-metadata';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: '../.env' });

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `http://localhost:5173`,
        methods: ['GET', 'POST'],
    },
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

app.use('/api', router);

// Xử lý các route không tồn tại
app.use((_: Request, res: Response) => {
    res.json({ message: 'Không tìm thấy đường dẫn' });
});
// Socket.IO kết nối
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
export default app;
