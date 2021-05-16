
import process from 'process';
import PassportJWT from 'passport-jwt';
import fs from 'fs';
import path from 'path';

import db from '../userDb.js';

const JwtStrategy = PassportJWT.Strategy;
const ExtractJwt = PassportJWT.ExtractJwt;

const pathToKey = path.join(process.cwd(), 'src', '02_DemoPassportJwt', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
};

export function getPassportJwtStrategy(passport, pgClient) {
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        
        console.log('jwt_payload ', jwt_payload);

        const user = db.userDB.getUserById(jwt_payload.sub);    // note .sub
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        // if (err) {
        //     return done(err, false);
        // }
        console.log('result from db query user ');
        console.log(user)
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}