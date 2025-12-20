import express from 'express';
import Watchlist from './watchlistModel';
import asyncHandler from 'express-async-handler';
import authenticate from '../../authenticate/index.js';

const router = express.Router();
router.use(authenticate); //protect the watchlist routes

// get users
router.get('/', async (req, res) => {
    const items = await Watchlist.find({ username: req.user.username });
    res.status(200).json(items);
});

router.post('/', asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    if (!movieId) {
        return res.status(400).json({ success: false, msg: 'MovieID required.' });
    }
    const created = await Watchlist.create({
        username: req.user.username,
        movieId,
    });
    res.status(201).json({ success: true, item: created });
})
);
// delete added
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