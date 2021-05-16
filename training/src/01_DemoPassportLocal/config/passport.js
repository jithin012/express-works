import passport from 'passport';
import LocalPassport from 'passport-local';
import db from '../tempDb.js'
import {validPassword} from '../utils/passwordUtils.js';

const LocalStrategy = LocalPassport.Strategy;

const customFields = {
    usernameField: 'username',
    passwordField: 'pwd'
};

const verifyCallback = (username, password, done) => {
    const user = db.userDB.getUser(username);
    if (!user) { return done(null, false) }
    const isValid = validPassword(password, user.hash, user.salt);
    if (isValid) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}

export default function configLocalPassport() {
    const strategy  = new LocalStrategy(customFields, verifyCallback);

    passport.use(strategy);
    
    passport.serializeUser((user, done) => {
        done(null, user.userId);
    });
    
    passport.deserializeUser((userId, done) => {
        const user = db.userDB.getUserById(userId);
        if (user) {
            return done(null, user);
        } else {
            return done(new Error('Custom Err'))
        }
    });   
}