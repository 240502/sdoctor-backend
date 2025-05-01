import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import appRouter from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { config } from './config/config';
import { Socket } from 'socket.io';
import { initSocket } from './socket';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
dotenv.config({ path: '../.env' });
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser()); // Thêm middleware cookie-parser
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// Tạo middleware csrf, lưu secret token trong cookie
const csrfProtection = csurf({ cookie: true });

// Dùng middleware csurf cho toàn app hoặc theo route
app.use(csrfProtection);
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
const server = http.createServer(app);
initSocket(server);

app.use('/api', appRouter);
// Endpoint để lấy CSRF token
app.get('/api/csrf-token', (req: Request, res: Response) => {
    console.log('call csrf token again');

    res.json({ csrfToken: req.csrfToken() });
});

// Xử lý các route không tồn tại
app.use((_: Request, res: Response) => {
    res.status(404).json({ message: 'Không tìm thấy đường dẫn' });
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === 'EBADCSRFTOKEN') {
        res.status(403).json({ message: 'Invalid CSRF token' });
    } else {
        console.error(err.stack);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

server.listen(config.port, () => {
    console.log(`Server connected to http://localhost:${config.port}`);
});
