import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connect.db';
import bodyParser from 'body-parser';
dotenv.config();
import orderRouter from './router/order.router';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/v1/order', orderRouter);

const start = async () => {
  await connectDB(process.env.DB_URL as string);
  console.log(`DB Connected`);
  app.listen(port, () => {
    console.log(`The Server is listening on port ${port}`)
  })
}

start()