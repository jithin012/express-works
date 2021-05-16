import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';
import path from 'path';
import process from 'process';
import fs from 'fs';

export function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

export function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

export function issueJWT(user) {
    const _id = user.userId;

    const expiresIn = '1d';
    
    const payload = {
        sub: _id,
        lat: Date.now()
    };

    const pathToKey = path.join(process.cwd(), 'src', '02_DemoPassportJwt', 'id_rsa_priv.pem');
    const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn, algorithm: 'RS256' });

    return {
        token: 'Bearer '+ signedToken,
        expiresIn
    }
}