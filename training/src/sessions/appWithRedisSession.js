import session from 'express-session';
import { createClient } from '../utils/redisClient.js';
import connectRedis from 'connect-redis';


// creating redis client
const redisClient = createClient({
    retry_strategy: ({error}) => redisClient.emit('error', error)
});

redisClient.on('error', (err) => {
    throw new Error(err);
});

redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

// redis session storage for express
const RedisStore = connectRedis(session);

const sessionStore = new RedisStore({
    client: redisClient,
});


const thirtyMinuteInMillis = 24*60*1000;

const redisSession = session({
    store: sessionStore,
    saveUninitialized: true,    // notice this key-value
    secret: 'jithin the secret',
    resave: false,
    cookie: {maxAge: thirtyMinuteInMillis}
})


export default redisSession;

export { redisClient } ;