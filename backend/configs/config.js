const DB_USER = process.env.MONGO_INITDB_ROOT_USERNAME
const DB_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD
const DB_NAME = process.env.MONGO_INITDB_ROOT_DATABASE
const DB_HOST = process.env.MONGO_INITDB_ROOT_HOST
const DB_PORT = process.env.MONGO_INITDB_ROOT_PORT

module.exports = {
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    MONGO_URL: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
};
