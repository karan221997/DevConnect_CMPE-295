const mongoose = require("mongoose");
const User = require("./User");

const HackathonSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        winningPoints: {
            type: Number,
            required: true
        },
        maxTeamSize: {
            type: Number,
            required: true
        },
        time : {
            type: String,
            required: true
        },
        participants: {
            type : Array,
            default: []
        },

    }
    , { timestamps: true }
);

module.exports = mongoose.model("Hackathon", HackathonSchema);
