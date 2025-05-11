import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import appRouter from './routes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { config } from './config/config';
import { initSocket } from './socket';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger/swagger';
dotenv.config({ path: '../.env' });
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser()); // Thêm middleware cookie-parser
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
const server = http.createServer(app);
initSocket(server);

app.use('/api', appRouter);
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Xử lý các route không tồn tại
app.use((_: Request, res: Response) => {
    res.status(404).json({ message: 'Không tìm thấy đường dẫn' });
});

server.listen(config.port, () => {
    console.log(`Server connected to http://localhost:${config.port}`);
    console.log(
        `Swagger UI available at http://localhost:${config.port}/api-docs`,
    );
});
