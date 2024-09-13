import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import router from './routes';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const app = express();

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
export default app;
