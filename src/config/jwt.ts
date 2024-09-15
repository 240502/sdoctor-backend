import jwt from 'jsonwebtoken';
import { config } from './config';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (err: any) {
        return null;
    }
};
