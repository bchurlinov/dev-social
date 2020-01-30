const mongoose = require("mongoose");
const gravatar = require("gravatar");
const md5 = require("md5");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6
    },
    avatar: {
        type: String
    },
    profile: {
      type: Boolean,
      default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    pushToken: {
        type: "String"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

UserSchema.pre("save", async function(next) {
    try {

        this.avatar = `http://gravatar.com/avatar/${md5(this.email)}?d=identicon`;
        next();

    } catch (err) {
        console.error(err);
    }
});

UserSchema.pre("save", async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        next();
    } catch(err) {
        console.error(err)
    }

});

module.exports = User = mongoose.model("user", UserSchema);