import mongoose from "mongoose";

const Schema = mongoose.Schema;
//stores movies added to a users watchlist 
const WatchlistSchema = new Schema({
    // username of authenticated user
    username: { type: String, required: true, index: true },
    movieId: { type: Number, required: true }, //movie id added to the watchlist
},
    { timestamps: true } // created and updated at timestamps
);
// one movie per one user
// compound index to make sure that a user cant add the same movie more than once
WatchlistSchema.index({ username: 1, movieId: 1 }, { unique: true });
export default mongoose.model("Watchlist", WatchlistSchema);