import 'dotenv/config'

const config = {
    PORT: process.env.PORT,
    DB: process.env.MONGODB_URL,
    SALT: parseInt(process.env.SALT, 10),

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
}
export default config


