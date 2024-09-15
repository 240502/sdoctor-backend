import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/jwt';

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    //get the jwt token from the authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Bạn không được cấp quyền!' });
    }
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({ message: 'Bạn không được cấp quyền!' });
    }
    next();
};
