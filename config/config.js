import path from 'path'
const CURRENT_WORKING_DIRECTORY = process.cwd();
require('dotenv').config({
    path: path.join(CURRENT_WORKING_DIRECTORY, './server/env/.env')
})

const config = {
    port: process.env.PORT,
    EMAIL_PASSWORD: process.env.EMAIL_APP_PASSWORD,
    USER_EMAIL: process.env.USER_EMAIL
}

export default config;