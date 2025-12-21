import mongoose from "mongoose";
const Schema = mongoose.Schema;
// stores movies that a user has recently reviewed
const RecentlyViewedSchema = new Schema({
    username: { type: String, required: true, index: true }, //username of logged in 
    movieId: { type: Number, required: true }, //movie id of viewed movie
    viewedAt: { type: Date, default: Date.now }, // timestamp of when movie was viewed
},
{timestamps: true} // adds created at and updated at timestamps
);
// this is used to prevent any duplications 
RecentlyViewedSchema.index({ username: 1, movieId: 1 }, { unique: true });

export default mongoose.model("RecentlyViewed", RecentlyViewedSchema);