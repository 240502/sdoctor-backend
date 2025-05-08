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
        socket.on('joinRoom', ({ userId, roomName }) => {
            try {
                console.log(`User ${socket.id} joined room ${roomName}`);
                socket.join(roomName);
            } catch (err) {
                console.error('Invalid token for joinRoom:', err);
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
