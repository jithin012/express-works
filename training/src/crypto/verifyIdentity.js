import crypto from 'crypto';
import fs from 'fs';
import {decrypotWithPrivateKey, decryptWithPublicKey} from './decrypt.js';
import process from 'process'
// This is the data that we are receiving from the sender
import {packageOfDataToSend} from './signMessage.js'

const hash = crypto.createHash(packageOfDataToSend.algorithm);

const publicKey = fs.readFileSync(process.cwd() + '/id_rsa_pub.pem', 'utf8');

const decryptedMessage = decryptWithPublicKey(publicKey, packageOfDataToSend.signedAndEncryptedData);

const decryptedMessageHex = decryptedMessage.toString();

const hashOfOriginal = hash.update(JSON.stringify(packageOfDataToSend.originalData));
const hashOfOriginalHex = hash.digest('hex');

if (hashOfOriginalHex === decryptedMessageHex) {
    console.log('Success!  The data has not been tampered with and the sender is valid.')
} else {
    console.log('Uh oh... Someone is trying to manipulate the data or someone else is sending this!  Do not use!');
}