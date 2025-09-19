import mongoose from 'mongoose'
import config  from '../config/config.js'

const connectDb = async () =>{
    try {
        await mongoose.connect(`${config.DB}/saas`)
        console.log(`Database connected Successfully...`)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
export default connectDb