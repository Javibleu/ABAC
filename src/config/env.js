import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET
}