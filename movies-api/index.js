import dotenv from 'dotenv';
import express from 'express';
import './db';
import cors from 'cors';
// api route handlers
import usersRouter from './api/users';
import moviesRouter from './api/movies';
import watchlistRouter from './api/watchlist';
import recentlyViewedRouter from "./api/recentlyViewed";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
//users and authentication routes mounted
app.use('/api/users', usersRouter);
//movies api routes mounted
app.use('/api/movies', moviesRouter);
// watchlist api routes mounted
app.use("/api/watchlist", watchlistRouter);
// recently reviewed api routes mounted
app.use("/api/recently-viewed", recentlyViewedRouter);

// error-handling middleware
const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(`Something went wrong!`);
  }
  res.status(500).send(`Hey!! You caught the error. Here's the details: ${err.stack} `);
};
app.use(errHandler); //register error handler

const port = process.env.PORT;
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
