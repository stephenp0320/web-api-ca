import dotenv from 'dotenv';
import express from 'express';
import './db';
import cors from 'cors';
import usersRouter from './api/users';
import authenticate from './authenticate';


dotenv.config();

const errHandler = (err, req, res) => {
  if(process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error 👍👍. Here's the details: ${err.stack} `);
};


const app = express();

app.use(cors());

const port = process.env.PORT;

app.use(express.json());


app.use(errHandler);

app.use('/api/users', usersRouter);


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
