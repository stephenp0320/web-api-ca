import express from 'express';
import Watchlist from './watchlistModel';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();
router.use(authenticate); //protect the watchlist routes

// get users
//returns the watchlist of the logged in user
router.get('/', async (req, res) => {
    const items = await Watchlist.find({ username: req.user.username });
    res.status(200).json(items);
});
// adds a movie to the logged in users watchlist
router.post('/', asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    if (!movieId) { // input validation 
        return res.status(400).json({ success: false, msg: 'MovieID required.' });
    }
    //creates a new watchlist entry for the user + movie
    const created = await Watchlist.create({
        username: req.user.username,
        movieId,
    });
    res.status(201).json({ success: true, item: created });
})
);
// delete added
// removies a movie from the logged in users watchlist 
router.delete( "/:movieId", asyncHandler(async (req, res) => {
      const movieId = Number(req.params.movieId);
      await Watchlist.deleteOne({
        username: req.user.username,
        movieId,
      });
  
      res.status(204).end();
    })
  );

export default router;