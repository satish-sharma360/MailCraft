import express from 'express'
import cookieParser from 'cookie-parser';
import connectDb from './utils/dbConnection.js';
import  config  from './config/config.js';
import userRouter from './routes/user.route.js';
import cors from 'cors'
import templateRouter from './routes/template.routes.js';

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                  
}));

const SERVERPORT = config.PORT || 7000;

app.use('/v1/auth',userRouter)
app.use('/v1/template',templateRouter)

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});


(async (req, res) => {
    try {
        await connectDb()

        app.listen(SERVERPORT, () => {
            console.log(`Server is listening on port ${SERVERPORT}...`)
        })
    } catch (error) {
        console.error('Failed to start server due to a database connection error.');
    }
})()