const dotSafe =  require('dotenv-safe');

dotSafe.config({example: './sample.env'});

module.exports = {
    ...process.env
}