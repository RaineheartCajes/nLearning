import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import router from './routes';
import path from 'path';

// dotenv.config();

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173' 
}));

app.use(express.json());
app.use('/', router());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/');
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://wildgoose:mernapp@mernproject.hceq3ru.mongodb.net/mern');
mongoose.connection.on('error', (error) => console.error(error));
