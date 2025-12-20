import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
    username: { type: String, required: true, index: true },
    movieId: { type: Number, required: true },
},
{timestamps: true}
);
// one movie per one user
WatchlistSchema.index({ username: 1, movieId: 1 }, { unique: true });
export default mongoose.model("Watchlist", WatchlistSchema);