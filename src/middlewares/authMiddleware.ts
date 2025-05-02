import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../config/jwt';

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: 'Không có access token!' });
    }
    try {
        const decodedToken = verifyToken(accessToken);
        if (!decodedToken) {
            return res
                .status(401)
                .json({ message: 'Bạn không được cấp quyền!' });
        }
        next();
    } catch (err: any) {
        return res
            .status(401)
            .json({ message: 'Invalid or expired access token' });
    }
};
