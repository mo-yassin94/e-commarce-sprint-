import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import productRouter from './routes/productRouter.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/user', userRouter);
app.use('/app', categoryRouter);
app.use('/products', productRouter);

// connect to mongodb
const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to mongodbase');
  })
  .catch((err) => {
    console.log(err.message);
  });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is started at ${PORT}`);
});
