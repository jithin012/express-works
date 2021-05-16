import crypto from 'crypto';
import fs from 'fs';
import process from 'process';

function genKeyPair() {
    // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
    const keyPair = crypto.generateKeyPairSync('rsa', {         // Sculptor : rsa || es for req.publicKeyAlg
        modulusLength: 4096, // bits - standard for RSA keys
        publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"  // Sculptor : spki
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            format: 'pem', // Most common formatting choice
            type: 'pkcs1', // "Public Key Cryptography Standards 1"     // sculptor : pkcs8
        }
    });

    // Create the public key file
    fs.writeFileSync(process.cwd() + '/id_rsa_pub.pem', keyPair.publicKey); 
    
    // Create the private key file
    fs.writeFileSync(process.cwd() + '/id_rsa_priv.pem', keyPair.privateKey);

}

// Generates the keypair
genKeyPair();