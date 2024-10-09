import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

// User routes
import router from './routes/user.routes.js';

app.use('/api/v1/users', router);

export { app };
