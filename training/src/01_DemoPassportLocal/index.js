import passport from 'passport';

import {genPassword} from './utils/passwordUtils.js'
import db from './tempDb.js';
import {isAuth, isAdmin} from './authMiddleware/authMiddleware.js'
import configLocalPassport from './config/passport.js';

export function demoLocalPassport(app) {
    configLocalPassport();
    app.use(passport.initialize());
    app.use(passport.session());
    
    // All POST
    
    app.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/login-success' }));
    
    app.post('/register', (req, res, next) => {
        console.log(req.body)
        const saltHash = genPassword(req.body.pwd);
        
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const admin = true;
    
        db.userDB.addUser(req.body.username, hash, salt, admin)
        res.redirect('/login');
     });
    
    
    // All GET
    app.get('/', (req, res, next) => {
        if (req.session.viewCount) {
            req.session.viewCount++;
        } else {
            req.session.viewCount = 1;
        }
        res.send(`<h1>Home You are visitied ${req.session.viewCount} times</h1><p>Please <a href="/register">register</a></p>`);
    });
    
    app.get('/login', (req, res, next) => {
        const form = '<h1>Login Page</h1><form method="POST" action="/login">\
        Enter Username:<br><input type="text" name="username">\
        <br>Enter Password:<br><input type="password" name="pwd">\
        <br><br><input type="submit" value="Submit"></form>';
        res.send(form);
    });
    
    app.get('/register', (req, res, next) => {
        const form = '<h1>Register Page</h1><form method="post" action="register">\
                        Enter Username:<br><input type="text" name="username">\
                        <br>Enter Password:<br><input type="password" name="pwd">\
                        <br><br><input type="submit" value="Submit"></form>';
    
        res.send(form);
    });
    
    app.get('/login-success', (req, res, next) => {
        res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
    });
    
    app.get('/login-failure', (req, res, next) => {
        res.send('You entered the wrong password.');
    });
    
    app.get('/protected-route', isAuth, (req, res, next) => {
        res.send('You made it to the route.');
    });
    
    app.get('/admin-route', isAdmin, (req, res, next) => {
        res.send('You made it to the admin route.');
    });
}