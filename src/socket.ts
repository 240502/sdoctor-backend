// src/services/socketService.ts
import { Server } from 'socket.io';
import http from 'http';
import * as jwt from 'jsonwebtoken';
let io: Server;
import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/config';

// Tăng cường type cho IncomingMessage
interface SocketRequest extends express.Request {
    cookies: { [key: string]: string };
}
export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173', // Thay đổi theo nhu cầu
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    // Áp dụng cookie-parser cho Socket.IO
    io.use((socket, next) => {
        const req = socket.request as SocketRequest;
        cookieParser()(req, {} as express.Response, () => {
            next();
        });
    });

    io.on('connection', (socket) => {
        console.log('A client connected: ' + socket.id);
        socket.on('joinRoom', ({ userId }) => {
            const accessToken = (socket.request as SocketRequest).cookies
                .accessToken;
            if (accessToken) {
                try {
                    const decoded = jwt.verify(
                        accessToken,
                        config.jwt.secret!,
                    ) as { id: number; email: string };
                    if (decoded.id === userId) {
                        console.log(`User ${userId} joined room`);
                        socket.join(`doctor_${userId}`);
                    } else {
                        console.error('User ID mismatch');
                    }
                } catch (err) {
                    console.error('Invalid token for joinRoom:', err);
                }
            } else {
                console.error('No accessToken provided');
            }
        });
        socket.on('disconnect', () => {
            console.log('A client disconnected: ' + socket.id);
        });
        // Loại bỏ client khỏi room
        socket.on('leave', (room) => {
            socket.leave(room);
            console.log(`Socket ${socket.id} left room: ${room}`);
        });
    });
};

export const getSocket = () => {
    if (!io) {
        throw new Error('Socket not initialized!');
    }
    return io;
};
