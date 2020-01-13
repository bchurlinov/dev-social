const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: [true, "Status is required"]
    },
    bio: {
        type: String
    },
    skills: {
        type: [String],
        required: true
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        github: {
            type: String
        }
    },
    experience: [
        {
            position: {
                type: String,
                required: [true, "Please enter your job positing"]
            },
            company: {
                type: String,
                required: [true, "Please enter the company's name"]
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            description: {
                type: String
            },
            current: {
                type: Boolean,
                default: false
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);