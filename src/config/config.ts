require('dotenv').config();

export const config = {
    port: process.env.PORT || 400,
    limit_size: process.env.LIMIT_SIZE || 3145728,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_DATABASE || 'sdoctor',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'secret key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    },
};
