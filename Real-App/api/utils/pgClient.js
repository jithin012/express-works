const PgPool = require('pg-pool');

const env = require('../env');

const defaultConfig = {
    host: env.DB_HOST,
    database: env.DB_DATABASENAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    max: env.DB_MAX, // set pool max size to 20

    // idleTimeoutMillis: 1000, // close idle clients after 1 second
    // connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    // maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
};

const pgPool = new PgPool(defaultConfig);

module.exports = pgPool;
