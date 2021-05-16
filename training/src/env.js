import dotSafe from 'dotenv-safe';

dotSafe.config({example: './.env.example'});

export default {
    ...process.env
}