import crypto from 'crypto';
import fs from 'fs';
import {encryptWithPublicKey, encryptWithPrivateKey} from './encrypt.js'
import {decrypotWithPrivateKey, decryptWithPublicKey} from './decrypt.js';
import process from 'process';

const myData = {
    firstName: 'Jithin',
    lastName: 'baby',
    credential: 'No, Never put personal info in a digitially signed message since this form of crypto. does not hide the data.'
};
const myDataString = JSON.stringify(myData);


const hash = crypto.createHash('sha256');
hash.update(myDataString);
const hashedData = hash.digest('hex');

const senderPrivateKey = fs.readFileSync(process.cwd()+'/id_rsa_priv.pem', 'utf8');
const signedMessage = encryptWithPrivateKey(senderPrivateKey, hashedData);

export const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: myData,
    signedAndEncryptedData: signedMessage,
}