// import crypto from 'crypto';

// const SECRET = 'ATM-API-AUTHENTICATION'

// const random = () => {
//     return crypto.randomBytes(128).toString('base64');
// };

// const authentication = (salt: string, password: string) => {
//     return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
// };

// export { random, authentication }