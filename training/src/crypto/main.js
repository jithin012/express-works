// Do the command 

import fs from 'fs';
import { encryptWithPublicKey } from './encrypt.js';
import process from 'process';

import {decrypotWithPrivateKey} from './decrypt.js';

const publicKey = fs.readFileSync(process.cwd()+'/id_rsa_pub.pem', 'utf8');

// store a buffer object
const encryptedMessage = encryptWithPublicKey(publicKey, 'Super secret Message');
console.log(encryptedMessage.toString());

const privateKey = fs.readFileSync(process.cwd()+'/id_rsa_priv.pem', 'utf8');
const decryptedMessage = decrypotWithPrivateKey(privateKey, encryptedMessage);
console.log(decryptedMessage.toString()); // will shows the message in it
