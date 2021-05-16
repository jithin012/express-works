import passport from 'passport';

import { getPassportJwtStrategy } from './config/passport.js';
import {
    genPassword,
    validPassword,
    issueJWT
} from './utils.js';

import db from './userDb.js';


export function demoPassportJwt(app, pgClient) {

    getPassportJwtStrategy(passport, pgClient);
    app.use(passport.initialize());

    app.post('/api/v1/user/login', (req, res, next) => {
        const user = db.userDB.getUser(req.body.username);
        console.log('iser');
        console.log(user)
        if(!user) {
            res.status(401).json({success: false, msg: "Not authorized"});
            return
        }
        const isValid = validPassword(req.body.password, user.hash, user.salt);

        if (isValid) {
            const tokenObj = issueJWT(user);
            res.status(200).json({success: true, tokenObj, user});
        } else {
            res.status(401).json({success: false, msg: "Wrong Password"});
        }

    });
    
    app.post('/api/v1/user/register', (req, res, next) => {
        const saltHash = genPassword(req.body.password);

        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const user = db.userDB.addUser(req.body.username, hash, salt, true);
        const jwt = issueJWT(user);
        res.json({success: true, user, token: jwt.token, expiresIn: jwt.expiresIn});
    });

    app.get('/api/v1/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
        res.status(200).json({success: true, msg: 'You are auth for thid route.'})
    });
    

}