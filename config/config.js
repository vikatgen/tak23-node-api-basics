import dotenv from 'dotenv';

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
    common: {
        PORT: process.env.PORT || 3000,
        JWT_SECRET_HASH: process.env.JWT_SECRET_HASH || 'secret',
    },
    development: {
        DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
        LOGGER_LEVEL: 'debug'
    },
    test: {
        DATABASE_URL: process.env.DATABASE_URL || 'file:./test.sqlite',
        LOGGER_LEVEL: 'error',
        PORT: 3007,
        JWT_SECRET_HASH: process.env.JWT_SECRET_HASH || 'test-secret-hash-for-testing-only',
    },
    production: {
        DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
        LOGGER_LEVEL: 'info'
    }
};

const environmentConfig = {
    ...config.common,
    ...config[NODE_ENV],
    ENVIRONMENT: NODE_ENV
}

export default environmentConfig;