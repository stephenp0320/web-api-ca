import express from "express";
import asyncHandler from "express-async-handler";
import RecentlyViewed from "./recentlyViewedModel.js";
import authenticate from "../../authenticate/index.js";

const router = express.Router(); // protects routes
router.use(authenticate);

//this returns the users movies that were recently reviewed
router.get("/", asyncHandler(async (req, res) => {
      const items = await RecentlyViewed.find({ username: req.user.username })
        .sort({ viewedAt: -1 })
        .limit(10);
      res.status(200).json(items);
    })
  );

  // post when a movie is viewed
  router.post("/", asyncHandler(async (req, res) => {
      const { movieId } = req.body;
      if (!movieId) {
        return res.status(400).json({ msg: "movieId required" });
      }
      //used to update the timestamp when a movie is viewed
        const item = await RecentlyViewed.findOneAndUpdate(
        { username: req.user.username, movieId },
        { viewedAt: new Date() },
        { upsert: true, new: true }
      );
  
      res.status(201).json(item);
    })
  );

  export default router;