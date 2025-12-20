import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RecentlyViewedSchema = new Schema({
    username: { type: String, required: true, index: true },
    movieId: { type: Number, required: true },
    viewedAt: { type: Date, default: Date.now },
},
{timestamps: true}
);
// this is used to prevent any duplications 
RecentlyViewedSchema.index({ username: 1, movieId: 1 }, { unique: true });

export default mongoose.model("RecentlyViewed", RecentlyViewedSchema);