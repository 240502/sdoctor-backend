// src/services/socketService.ts
import { Server } from 'socket.io';
import http from 'http';

let io: Server;

export const initSocket = (server: http.Server) => {
    io = new Server(server, {
        cors: {
            origin: '*', // Thay đổi theo nhu cầu
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log('A client connected: ' + socket.id);
        socket.on('join', (userId: number) => {
            socket.join(`doctor_${userId}`);
            console.log(`client ${socket.id} joined room doctor_${userId}.`);
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
