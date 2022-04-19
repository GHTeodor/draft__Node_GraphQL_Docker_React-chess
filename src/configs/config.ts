import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    MySQL_DB_NAME: process.env.MySQL_DB_NAME,
};
