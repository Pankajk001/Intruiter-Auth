import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/dbConnect.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

await connectDB();


app.use(express.json());
app.use(cookieParser());


app.use(
    cors({
      origin: 'https://intruiter-auth-frontend.onrender.com', 
      credentials: true, 
    })
  );

// api endpoints
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth', authRouter);

app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

