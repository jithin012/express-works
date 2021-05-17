const redis = require('redis');
const env = require('../env');

const defaultConfig = {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT
}

const factory = () => {
    const client = redis.createClient({
        ...defaultConfig
    });
    return client;
}


module.exports = factory;

// // export global redis client
// export default factory();