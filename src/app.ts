import express, { Request, Response } from 'express';
import 'reflect-metadata';
import appRouter from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { config } from './config/config';
import { Socket } from 'socket.io';
import { initSocket } from './socket';

dotenv.config({ path: '../.env' });
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
const server = http.createServer(app);
initSocket(server);

app.use('/api', appRouter);
// Xử lý các route không tồn tại
app.use((_: Request, res: Response) => {
    res.json({ message: 'Không tìm thấy đường dẫn' });
});

server.listen(config.port, () => {
    console.log(`Server connected to http://localhost:${config.port}`);
});
