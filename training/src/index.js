import express from 'express';
import bodyParser from 'body-parser';

import env from './env.js';
import redisSession, { redisClient } from './sessions/appWithRedisSession.js';
import pgPool from './utils/pgClient.js';
// import { demoLocalPassport } from './01_DemoPassportLocal/index.js'
import { demoPassportJwt } from './02_DemoPassportJwt/index.js';

// import {createUserTable} from './services/Users/db/userDb.js';
// createUserTable(pgPool);


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(redisSession);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Max-Age', '3600');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Method', 'GET, HEAD, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Header', 'Authorization, Origin'); // 'X-Requested-With, X-Requested-Through, Content-Type, Accept'

    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
    // setting one year
    res.header('Strict-Transport-Security', 'max-age=31536000');

    //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
    res.header('X-Frame-Options', 'sameorigin');
    next();
})

const port = env.API_PORT;          // Do a type safe for port. (isFinite(port) && typeof port ==='number')

// demoLocalPassport(app);
demoPassportJwt(app, pgPool);

app.listen(port, () => {
    console.info(`----> Api is Running on port ${port}`)
});