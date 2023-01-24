import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING.');
});

const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', false); //  this is only to avoid deprecation message on terminal

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Database connected! Server running on port ${PORT}`)
    )
  )
  .catch((err) => console.log(err.message));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
}
