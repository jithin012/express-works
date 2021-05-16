/**
 * 
 * Least Complex - use jsonwebtoken  and passport-jwt as our middleware
 * 
 * 0. client send the req with JWT
 * 1. The server looks for the JWT in the authrization http header and verifies the signature.
 * 2. If the Signature is valid, the server decodes the JWT, ususally gets the database ID of the user in the 'payload.sub' field, 
 *    looks the user up in the database, and stores the user object to use.
 * 3. client receives the route data
 * 
 * do command `node GenerateKeyPair.js`
 * 
 * 
 */