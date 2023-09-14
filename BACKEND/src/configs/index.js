const config = {
    DB_CONNECTION_STRING: process.env.MONGODB_URL,
    JWT_SECRET: process.env.SECRET,
};

export default config;