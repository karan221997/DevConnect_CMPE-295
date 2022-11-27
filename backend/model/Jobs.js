const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        salary: {
            type: Number,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        skills: {
            type: String,
            required: true
        },
        experience: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        applicants: {
            type: Array,
            default: []
        },

    }
    , { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);