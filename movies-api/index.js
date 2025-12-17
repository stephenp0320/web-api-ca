import dotenv from 'dotenv';
import express from 'express';
import './db';
import cors from 'cors';
import usersRouter from './api/users';
import moviesRouter from './api/movies';   


dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/users', usersRouter);

app.use('/api/movies', moviesRouter);

const errHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error. Here's the details: ${err.stack} `);
};
app.use(errHandler);
 
const port = process.env.PORT;
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
