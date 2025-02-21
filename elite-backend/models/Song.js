
const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

const SongModel = mongoose.model("Song", SongSchema);

module.exports = SongModel;
