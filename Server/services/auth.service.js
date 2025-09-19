import UserModels from "../Models/User.models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const {
    SALT,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY
} = config;

class AuthService {
    async hashPassword(password) {
        return bcrypt.hash(password ,SALT)
    }
    async comparePassword(password, hashPassword) {
        return await bcrypt.compare(password , hashPassword)

    }
    async generateTokens(payload) {
        const accessToken = await jwt.sign(payload , ACCESS_TOKEN_SECRET,{
            expiresIn:ACCESS_TOKEN_EXPIRY
        })
        const refreshToken = await jwt.sign(payload , REFRESH_TOKEN_SECRET ,{
            expiresIn:REFRESH_TOKEN_EXPIRY
        })

        return {accessToken , refreshToken}
    }
    async signupUser(name, email, password) {
        const existingUser = await UserModels.findOne({ email })
        if (existingUser) {
            throw new Error('User already exists with this email.');
        }
        const hashedPassword = await this.hashPassword(password)

        const newUser = await UserModels.create({
            name,
            email,
            password:hashedPassword
        })

        const payload = { id: newUser._id, email:newUser.email};
        const {accessToken , refreshToken} = await this.generateTokens(payload)

        return {accessToken , refreshToken , user:newUser}
    }
    async loginUser(email , password) {
        const user = await UserModels.findOne({email});
        if(!user){
            throw new Error('Invalid credentials.');
        }
        const isMatch = await this.comparePassword(password, user.password)
        if (!isMatch) {
            throw new Error('Invalid credentials.');
        }

        const payload =  { id: user._id, email: user.email}
        const {accessToken , refreshToken} = await this.generateTokens(payload)
        return {accessToken , refreshToken , user}
    }

    async refreshAccessToken(refreshToken) {
        try {
            const decoded = await jwt.verify(refreshToken , REFRESH_TOKEN_SECRET)
            const user = await UserModels.findById(decoded.id)

            if (!user) {
                throw new Error('User not found.');
            }
            const payload = { id: user._id, email: user.email };
            const newAccessToken = await jwt.sign(payload , ACCESS_TOKEN_SECRET,{
                expiresIn:ACCESS_TOKEN_EXPIRY
            })
            return newAccessToken
        } catch (error) {
            throw new Error('Invalid or expired refresh token.');
        }
    }
}
export default new AuthService()