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
        socket.on('addApp', (data) => {
            console.log('new appointment');
            io.emit('newAppointment', data);
        });
        socket.on('disconnect', () => {
            console.log('A client disconnected: ' + socket.id);
        });
    });
};

export const getSocket = () => {
    if (!io) {
        throw new Error('Socket not initialized!');
    }
    return io;
};
