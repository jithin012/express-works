import redis from 'redis';

import env from '../env.js';


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

export const createClient = factory;

// export global redis client
export default factory();